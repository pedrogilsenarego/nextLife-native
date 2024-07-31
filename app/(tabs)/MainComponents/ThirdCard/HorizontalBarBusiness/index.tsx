import { HorizontalBarChart } from "@/components/Organisms/HorizontalBarChart";
import { useApp } from "@/providers/AppProvider";
import { Business } from "@/types/businessTypes";

type Props = {
  businessData: { business: Business; balance: number }[];
};

export const HorizontalBarChartBusiness: React.FC<Props> = ({
  businessData,
}) => {
  const { businessFilter } = useApp();

  const data = businessData
    .map((businessData) => {
      if (businessFilter.includes(businessData.business.id)) return undefined;
      return {
        value: businessData.balance,
        iconId: businessData.business.iconType,
      };
    })
    .filter(Boolean) as { value: number; iconId: number }[];

  return <HorizontalBarChart data={data} height={12} />;
};
