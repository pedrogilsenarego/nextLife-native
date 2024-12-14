import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { dateQueriesMap } from "@/utils/dateFormat";
import { getIncomes } from "@/actions/incomesActions";
import { IncomesQuery } from "@/types/incomesTypes";
import { useApp } from "@/providers/AppProvider";
import { IVA_RATE } from "@/constants/taxes";

type Props = {
  businessSelected?: string;
  selectedCategory?: string;
};

const useIncomes = ({ businessSelected, selectedCategory }: Props = {}) => {
  const {
    dateRange,
    businessFilter,
    categoryFilterIncomes,
    loadingFromPersist,
  } = useApp();
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
    enabled: !loadingFromPersist,
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
    : categoryFilterIncomes.length > 0
    ? filteredExpensesByBusiness.filter((income) =>
        categoryFilterIncomes.includes(income.category)
      )
    : filteredExpensesByBusiness;

  interface GetIVACalculationInput {
    dateStart?: Date;
    dateEnd?: Date;
  }

  const getIncomesIVA = ({
    dateStart,
    dateEnd,
  }: GetIVACalculationInput): number => {
    const totalIVA =
      expensesQuery?.data
        ?.filter((item) => {
          if (item.business.type !== 1 || item.is_iva_isent) {
            return false;
          }

          if (dateStart && dateEnd) {
            const itemDate = new Date(item.created_at);
            if (isNaN(itemDate.getTime())) {
              return false;
            }
            return itemDate >= dateStart && itemDate <= dateEnd;
          }
          return true;
        })
        .reduce((acc, item) => {
          const iva = item.amount * (IVA_RATE / (1 + IVA_RATE));
          return acc + iva;
        }, 0) ?? 0;

    return Math.round(totalIVA * 10) / 10;
  };

  return {
    ...expensesQuery,
    data: filteredIncomesByCategory,
    getIncomesIVA,
  };
};

export default useIncomes;
