import { getCars } from "@/actions/carsActions";
import { queryKeys } from "@/constants/queryKeys";
import { CarsQuery } from "@/types/carsTypes";
import { useQuery } from "@tanstack/react-query";

const useCars = () => {
  const realEstate = useQuery<CarsQuery, Error>({
    queryKey: [queryKeys.cars],
    queryFn: getCars,
  });

  return realEstate;
};

export { useCars };
