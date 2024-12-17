import { queryKeys } from "@/constants/queryKeys";
import { ExpensesQuery } from "@/types/expensesTypes";
import { useQuery } from "@tanstack/react-query";
import { dateQueriesMap } from "@/utils/dateFormat";
import { getExpenses } from "@/actions/expensesActions";
import { useApp } from "@/providers/AppProvider";
import { Categories } from "@/constants/categories";
import {
  categoriesToUseForIva,
  IVA_RATE,
  ivaCategories,
} from "@/constants/taxes";
import { useEffect } from "react";

type Props = {
  businessSelected?: string;
  selectedCategory?: string;
};

const useExpenses = ({ businessSelected, selectedCategory }: Props = {}) => {
  const {
    dateRange,
    businessFilter,
    categoryFilterExpenses,
    loadingFromPersist,
  } = useApp();
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
    enabled: !loadingFromPersist,
    staleTime: Infinity,
  });

  interface GetIVACalculationInput {
    dateStart?: Date;
    dateEnd?: Date;
  }

  interface IVAResult extends Partial<Record<Categories, number>> {
    total: number;
  }

  const getExpensesIVAAmortization = ({
    dateStart,
    dateEnd,
  }: GetIVACalculationInput): IVAResult => {
    const results = expensesQuery?.data
      ?.filter((item) => {
        if (item.business.type !== 1) {
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
      .reduce(
        (acc: IVAResult, item) => {
          if (!categoriesToUseForIva.includes(item.category)) {
            return acc;
          }

          const iva = item.amount * (IVA_RATE / (1 + IVA_RATE));

          const multiplier = ivaCategories[item.category] ?? 1;

          const computedIVA = iva * multiplier;
          acc[item.category] = (acc[item.category] ?? 0) + computedIVA;
          acc.total = (acc.total ?? 0) + computedIVA;

          return acc;
        },
        { total: 0 }
      ) ?? { total: 0 };
    for (const key in results) {
      results[key as Categories | "total"] =
        Math.round((results?.[key as Categories | "total"] || 0) * 10) / 10;
    }
    return results;
  };

  const filteredExpensesByBusiness = businessSelected
    ? (expensesQuery.data || []).filter(
        (expense) => expense.businessId === businessSelected
      )
    : businessFilter.length > 0
    ? (expensesQuery.data || []).filter(
        (expense) => !businessFilter.includes(expense.businessId)
      )
    : expensesQuery.data || [];

  const filteredExpensesByCategory = selectedCategory
    ? filteredExpensesByBusiness?.filter(
        (expense) => expense.category === selectedCategory
      )
    : categoryFilterExpenses.length > 0
    ? filteredExpensesByBusiness.filter((expense) =>
        categoryFilterExpenses.includes(expense.category)
      )
    : filteredExpensesByBusiness;

  return {
    ...expensesQuery,
    data: filteredExpensesByCategory,
    getExpensesIVAAmortization,
  };
};

export default useExpenses;
