import { getBusinesses } from "@/actions/businessActions";
import { queryKeys } from "@/constants/queryKeys";
import { BusinessQuery } from "@/types/businessTypes";

import { useQuery } from "@tanstack/react-query";

const useBusinesses = () => {
  const businesses = useQuery<BusinessQuery, Error>({
    queryKey: [queryKeys.businesses],
    queryFn: getBusinesses,
  });

  return businesses;
};

export default useBusinesses;
