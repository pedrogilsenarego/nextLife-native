import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { dateQueriesMap } from "@/utils/dateFormat";
import { getIncomes } from "@/actions/incomesActions";
import { IncomesQuery } from "@/types/incomesTypes";
import { useApp } from "@/providers/AppProvider";
import { CategoriesFilter } from "@/components/Molecules/CardFooter/FiltersModal/CategoriesFilter";

type Props = {
  businessSelected?: string;
  selectedCategory?: string;
};

const useIncomes = ({ businessSelected, selectedCategory }: Props = {}) => {
  const { dateRange, businessFilter, categoryFilter } = useApp();
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

  const filteredExpensesByBusiness = businessSelected
    ? (expensesQuery.data || []).filter(
        (expense) => expense.businessId === businessSelected
      )
    : businessFilter.length > 0
    ? (expensesQuery.data || []).filter(
        (expense) => !businessFilter.includes(expense.businessId)
      )
    : expensesQuery.data || [];

  const filteredIncomesByCategory = selectedCategory
    ? filteredExpensesByBusiness?.filter(
        (expense) => expense.category === selectedCategory
      )
    : CategoriesFilter.length > 0
    ? filteredExpensesByBusiness.filter(
        (income) => !categoryFilter.includes(income.category)
      )
    : filteredExpensesByBusiness;
  return {
    ...expensesQuery,
    data: filteredIncomesByCategory,
  };
};

export default useIncomes;
