import { getDeposits } from "@/actions/depositActions";
import { queryKeys } from "@/constants/queryKeys";

import { DepositQuery } from "@/types/depositTypes";

import { useQuery } from "@tanstack/react-query";

const useDeposits = () => {
  const deposits = useQuery<DepositQuery, Error>({
    queryKey: [queryKeys.deposits],
    queryFn: getDeposits,
  });

  return deposits;
};

export default useDeposits;
