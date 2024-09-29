import { getCredits } from "@/actions/creditsActions";
import { getRealEstate } from "@/actions/realEstateActions";
import { queryKeys } from "@/constants/queryKeys";
import { RealEstateQuery } from "@/types/realEstateTypes";

import { useQuery } from "@tanstack/react-query";

const useRealEstate = () => {
  const realEstate = useQuery<RealEstateQuery, Error>({
    queryKey: [queryKeys.realEstate],
    queryFn: getRealEstate,
  });

  return realEstate;
};

export default useRealEstate;
