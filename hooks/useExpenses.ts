import { queryKeys } from "@/constants/queryKeys";
import { ExpensesQuery } from "@/types/expensesTypes";
import { useQuery } from "@tanstack/react-query";
import { dateQueriesMap } from "@/utils/dateFormat";
import { getExpenses } from "@/actions/expensesActions";
import { useApp } from "@/providers/AppProvider";

const useExpenses = () => {
  const { dateRange } = useApp();
  const datesToQuery = dateQueriesMap(dateRange);
  console.log(datesToQuery);
  const expenses = useQuery<ExpensesQuery, Error>({
    queryKey: [queryKeys.expenses, dateRange],
    queryFn: () =>
      getExpenses({
        timeRange: {
          startDate: datesToQuery.startDate,
          endDate: datesToQuery.endDate,
        },
      }),
    staleTime: Infinity,
  });

  return expenses;
};

export default useExpenses;
