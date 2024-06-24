import { queryKeys } from "@/constants/queryKeys";
import { ExpensesQuery } from "@/types/expensesTypes";
import { useQuery } from "@tanstack/react-query";
import { dateQueriesMap } from "@/utils/dateFormat";
import { getExpenses } from "@/actions/expensesActions";
import { useApp } from "@/providers/AppProvider";

type Props = {
  businessSelected?: string;
};

const useExpenses = ({ businessSelected }: Props = {}) => {
  const { dateRange, businessFilter } = useApp();

  const datesToQuery = dateQueriesMap(dateRange);

  const expensesQuery = useQuery<ExpensesQuery, Error>({
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

  const filteredExpenses = businessSelected
    ? (expensesQuery.data || []).filter(
        (expense) => expense.businessId === businessSelected
      )
    : businessFilter && businessFilter.length > 0
    ? (expensesQuery.data || []).filter((expense) =>
        businessFilter.includes(expense.businessId)
      )
    : expensesQuery.data || [];

  return {
    ...expensesQuery,
    data: filteredExpenses,
  };
};

export default useExpenses;
