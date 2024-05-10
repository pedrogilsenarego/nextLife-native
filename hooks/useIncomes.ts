import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { dateQueriesMap } from "@/utils/dateFormat";
import { getIncomes } from "@/actions/incomesActions";
import { IncomesQuery } from "@/types/incomesTypes";
import { useApp } from "@/providers/AppProvider";

const useIncomes = () => {
  const { dateRange } = useApp();
  const datesToQuery = dateQueriesMap(dateRange);

  const expenses = useQuery<IncomesQuery, Error>({
    queryKey: [queryKeys.incomes, dateRange],
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
