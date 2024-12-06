import { useRealEstate } from "./realEstate.hooks";
import useCredits from "./useCredits";
import useDeposits from "./useDeposits";
import useReports from "./useReports";
import { format } from "date-fns";
import { useWatches } from "./watches.hooks";
import { useCars } from "./Cars/cars.hooks";

type DataType = {
  label: string;
  value: number;
};

export const usePortefolio = () => {
  const reports = useReports();
  const deposits = useDeposits();
  const credits = useCredits();
  const realEstate = useRealEstate();
  const watches = useWatches();
  const cars = useCars();
  const isLoadingPortefolio =
    reports.isLoading ||
    deposits.isLoading ||
    credits.isLoading ||
    realEstate.isLoading ||
    cars.isLoading ||
    watches.isLoading;

  const totalDepositsAmount = deposits?.data?.reduce((acc, deposit) => {
    return acc + (deposit.amount || 0);
  }, 0);

  const totalRealEstateAmount = realEstate?.data?.reduce((acc, credit) => {
    return acc + (credit.marketValue || 0);
  }, 0);

  const totalWatchesAmount = watches?.data?.reduce((acc, credit) => {
    return acc + (credit.value || 0);
  }, 0);

  const totalCarsAmount = cars?.data?.reduce((acc, credit) => {
    return acc + (credit.value || 0);
  }, 0);

  const totalCreditssAmount = credits?.data?.reduce((acc, credit) => {
    return acc + (credit.currentAmount || 0);
  }, 0);

  const totalCurrentPatrimony =
    parseInt(totalDepositsAmount?.toFixed(0) || "0") -
    parseInt(totalCreditssAmount?.toFixed(0) || "0") +
    parseInt(totalRealEstateAmount?.toFixed(0) || "0") +
    parseInt(totalWatchesAmount?.toFixed(0) || "0") +
    parseInt(totalCarsAmount?.toFixed(0) || "0");

  const portefolioInTime = (): DataType[] => {
    const reportData =
      reports?.data?.map((report) => ({
        label: format(new Date(report.createdAt), "MMM yy"),
        value: report.patrimony,
      })) || [];

    const currentPatrimony = {
      label: format(new Date(), "MMM yy"),
      value: totalCurrentPatrimony,
    };

    return [...reportData, currentPatrimony];
  };

  return {
    portefolioInTime,
    totalCurrentPatrimony,
    isLoadingPortefolio,
  };
};
