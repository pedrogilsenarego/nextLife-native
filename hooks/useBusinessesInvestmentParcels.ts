import { getBusinessInvestmentParcels } from "@/actions/businessInvestmentParcels";
import { queryKeys } from "@/constants/queryKeys";
import { BusinessInvestmentParcelsQuery } from "@/types/businessInvestmentParcels";
import { useQuery } from "@tanstack/react-query";

type Props = { businessId: string; enabled?: boolean };

const useBusinessesInvestmentParcels = (props: Props) => {
  return useQuery<BusinessInvestmentParcelsQuery, Error>({
    queryKey: [queryKeys.businessesInvestmentParcels, props.businessId],
    queryFn: () =>
      getBusinessInvestmentParcels({ businessId: props.businessId }),
    enabled: !!props.enabled,
  });
};

export default useBusinessesInvestmentParcels;
