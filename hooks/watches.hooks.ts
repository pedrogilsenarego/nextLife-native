import { getWatches } from "@/actions/watchesActions";
import { queryKeys } from "@/constants/queryKeys";
import { WatchQuery } from "@/types/watchesTypes";
import { useQuery } from "@tanstack/react-query";

const useWatches = () => {
  const realEstate = useQuery<WatchQuery, Error>({
    queryKey: [queryKeys.watches],
    queryFn: getWatches,
  });

  return realEstate;
};

export { useWatches };
