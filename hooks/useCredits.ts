import { getCredits } from "@/actions/creditsActions";
import { queryKeys } from "@/constants/queryKeys";
import { CreditQuery } from "@/types/creditsTypes";

import { useQuery } from "@tanstack/react-query";

const useCredits = () => {
  const credits = useQuery<CreditQuery, Error>({
    queryKey: [queryKeys.credits],
    queryFn: getCredits,
  });

  return credits;
};

export default useCredits;
