import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { dateQueriesMap } from "@/utils/dateFormat";
import { getIncomes } from "@/actions/incomesActions";
import { IncomesQuery } from "@/types/incomesTypes";

const useIncomes = () => {
  const datesToQuery = dateQueriesMap("currentMonth");
  const expenses = useQuery<IncomesQuery, Error>({
    queryKey: [queryKeys.incomes],
    queryFn: () =>
      getIncomes({
        timeRange: {
          startDate: datesToQuery.startDate,
          endDate: datesToQuery.endDate,
        },
      }),
    staleTime: Infinity,
  });

  return expenses;
};

export default useIncomes;
