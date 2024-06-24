import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { dateQueriesMap } from "@/utils/dateFormat";
import { getIncomes } from "@/actions/incomesActions";
import { IncomesQuery } from "@/types/incomesTypes";
import { useApp } from "@/providers/AppProvider";

type Props = {
  businessSelected?: string;
};

const useIncomes = ({ businessSelected }: Props = {}) => {
  const { dateRange, businessFilter } = useApp();
  const datesToQuery = dateQueriesMap(dateRange);

  const expensesQuery = useQuery<IncomesQuery, Error>({
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

export default useIncomes;
