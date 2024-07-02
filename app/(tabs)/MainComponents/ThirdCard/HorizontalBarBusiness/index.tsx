import { HorizontalBarChart } from "@/components/Organisms/HorizontalBarChart";
import { Business } from "@/types/businessTypes";

type Props = {
  businessData: { business: Business; balance: number }[];
};

export const HorizontalBarChartBusiness: React.FC<Props> = ({
  businessData,
}) => {
  const data = businessData?.map((businessData) => {
    return {
      value: businessData.balance,
    };
  });
  return <HorizontalBarChart data={data} height={12} />;
};
