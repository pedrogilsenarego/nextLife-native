import useDeposits from "./useDeposits";
import useReports from "./useReports";
import { format } from "date-fns";

type DataType = {
  label: string;
  value: number;
};

export const usePortefolio = () => {
  const reports = useReports();
  const deposits = useDeposits();
  const isLoadingPortefolio = reports.isLoading || deposits.isLoading;

  const totalDepositsAmount = deposits?.data?.reduce((acc, deposit) => {
    return acc + (deposit.amount || 0);
  }, 0);
  const totalCurrentPatrimony = parseInt(
    totalDepositsAmount?.toFixed(0) || "0"
  );

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
