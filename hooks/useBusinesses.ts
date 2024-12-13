import { getBusinesses } from "@/actions/businessActions";
import { queryKeys } from "@/constants/queryKeys";
import { BusinessQuery } from "@/types/businessTypes";

import { useQuery } from "@tanstack/react-query";

const useBusinesses = () => {
  const businesses = useQuery<BusinessQuery, Error>({
    queryKey: [queryKeys.businesses],
    queryFn: getBusinesses,
  });

  const getHasBusinessType = () => {
    let hasBusinessType = false;
    businesses.data?.forEach((business) => {
      if (business.type === 1) hasBusinessType = true;
    });
    return hasBusinessType;
  };

  return { ...businesses, getHasBusinessType };
};

export default useBusinesses;
