import { Expense } from "@/types/expensesTypes";

import useExpenses from "./useExpenses";
import useIncomes from "./useIncomes";
import { Income } from "@/types/incomesTypes";

import { useApp } from "@/providers/AppProvider";
import { dateQueriesMap, getMonthAbbreviation } from "@/utils/dateFormat";
import { differenceInMonths, endOfMonth, startOfMonth } from "date-fns";

type Props = {
  businessSelected?: string;
};

const useMetrics = ({ businessSelected }: Props = {}) => {
  const expenses = useExpenses({ businessSelected });
  const incomes = useIncomes({ businessSelected });
  const { dateRange } = useApp();

  const totalExpenses = () =>
    expenses?.data?.reduce((acc, item) => {
      return acc + item.amount;
    }, 0) ?? 0;

  const totalIncomes = () =>
    incomes?.data?.reduce((acc, item) => {
      return acc + item.amount;
    }, 0) ?? 0;

  const valueTotalPerDay = (data: Expense[] | Income[] | undefined) => {
    const today = dateQueriesMap(dateRange).endDate;

    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    const totalPerDay: { label: string; value: number }[] = [];

    // Initialize array with 0 values for each day of the month
    for (let i = 1; i <= currentDay; i++) {
      const label = i.toString();
      totalPerDay.push({ label, value: 0 });
    }

    // Update values for days coinciding with original data
    if (data) {
      data.forEach((expense) => {
        const expenseDate = new Date(expense.created_at);
        if (expenseDate.getMonth() === currentMonth) {
          const dayOfMonth = expenseDate.getDate();
          totalPerDay[dayOfMonth - 1].value += expense.amount;
        }
      });
    }

    return totalPerDay;
  };

  const valueTotalPerMonth = (data: Expense[] | Income[] | undefined) => {
    const { endDate, startDate } = dateQueriesMap(dateRange);

    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth() + 1; // Adding 1 to get 1-based month index

    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth() + 1;

    const totalPerMonth: { label: string; value: number }[] = [];
    const monthDataMap: { [key: string]: number } = {};

    // Initialize a map with 0 values for each month of the year that has data
    if (data) {
      data.forEach((entry) => {
        const entryDate = new Date(entry.created_at);
        const entryYear = entryDate.getFullYear();
        const entryMonth = entryDate.getMonth() + 1; // Adding 1 to get 1-based month index

        const monthKey = `${entryYear}-${entryMonth}`;

        if (!monthDataMap[monthKey]) {
          monthDataMap[monthKey] = 0;
        }

        monthDataMap[monthKey] += entry.amount;
      });
    }

    // Populate totalPerMonth with values from monthDataMap, ensuring to include middle and end empty months
    for (let year = startYear; year <= endYear; year++) {
      const monthStart = year === startYear ? startMonth : 1;
      const monthEnd = year === endYear ? endMonth : 12;

      for (let month = monthStart; month <= monthEnd; month++) {
        const label = `${getMonthAbbreviation(month)} ${year % 100}`;
        const monthKey = `${year}-${month}`;
        const value = monthDataMap[monthKey] || 0;

        // Include the month in totalPerMonth only if it has data or if it's after the first month with data
        if (value > 0 || totalPerMonth.length > 0) {
          totalPerMonth.push({ label, value });
        }
      }
    }

    return totalPerMonth;
  };

  const calculateCategoryPercentage = (expensesData: Expense[]) => {
    const minPercentage = expensesData.length > 10 ? 3 : 2;
    const categoryTotal = expensesData.reduce((acc: any, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    const totalExpensesAmount: any = Object.values(categoryTotal).reduce(
      (total: any, amount: any) => total + amount,
      0
    );

    const categoryPercentage = Object.entries(categoryTotal).map(
      ([category, amount]: any) => ({
        category,
        percentage: parseFloat(
          ((amount / totalExpensesAmount) * 100).toFixed(1)
        ),
        amount: parseFloat(amount.toFixed(1)),
      })
    );

    const totalSmallPercentage = categoryPercentage
      .filter((item) => item.percentage < minPercentage)
      .reduce(
        (stats, item) => {
          stats.totalPercentage += item.percentage;
          stats.totalAmount += item.amount;
          return stats;
        },
        { totalPercentage: 0, totalAmount: 0 }
      );

    const filteredCategoryPercentage = categoryPercentage
      .filter((item) => item.percentage >= minPercentage)
      .sort((a, b) => b.percentage - a.percentage)
      .concat({
        category: "Other",
        percentage: parseFloat(totalSmallPercentage.totalPercentage.toFixed(1)),
        amount: parseFloat(totalSmallPercentage.totalAmount.toFixed(1)),
      });

    return filteredCategoryPercentage;
  };

  const calculateTotalPerBusiness = (
    data: Expense[] | Income[] | undefined,
    businessId: string
  ) => {
    if (!data) return 0;
    return data
      .filter((item) => item.businessId === businessId)
      .reduce((acc, item) => acc + item.amount, 0);
  };

  const getExpensesPerBusiness = (businessId: string) => {
    const expensesPerBusiness = calculateTotalPerBusiness(
      expenses?.data ?? [],
      businessId
    );
    return expensesPerBusiness;
  };
  const getIncomesPerBusiness = (businessId: string) => {
    const incomesPerBusiness = calculateTotalPerBusiness(
      incomes?.data ?? [],
      businessId
    );
    return incomesPerBusiness;
  };

  const getExpensesCategoriesPercentage = () => {
    const categoriesPercentage = calculateCategoryPercentage(
      expenses?.data ?? []
    );

    return categoriesPercentage;
  };

  const getIncomesCategoriesPercentage = () => {
    const categoriesPercentage = calculateCategoryPercentage(
      incomes?.data ?? []
    );

    return categoriesPercentage;
  };

  const expensesTotalPerDay = () => valueTotalPerDay(expenses?.data);
  const expensesTotalPerMonth = () => valueTotalPerMonth(expenses?.data);
  const incomesTotalPerDay = () => valueTotalPerDay(incomes?.data);
  const incomesTotalPerMonth = () => valueTotalPerMonth(incomes?.data);

  const getNumberOfDifferentMonths = () => {
    if (
      !expenses?.data ||
      !incomes?.data ||
      expenses?.data.length === 0 ||
      incomes.data.length === 0
    ) {
      return 0;
    }

    const allData = [...expenses?.data, ...incomes?.data];
    allData.sort(
      (a, b) =>
        new Date(a?.created_at).getTime() - new Date(b?.created_at).getTime()
    );

    const firstDate = new Date(allData[0].created_at);
    const lastDate = new Date(allData[allData.length - 1].created_at);

    const startMonth = startOfMonth(firstDate);
    const endMonth = endOfMonth(lastDate);

    const totalMonths = differenceInMonths(endMonth, startMonth) + 1;

    return totalMonths;
  };

  return {
    totalExpenses,
    totalIncomes,
    expensesTotalPerDay,
    incomesTotalPerDay,
    expensesTotalPerMonth,
    incomesTotalPerMonth,
    getExpensesCategoriesPercentage,
    getIncomesCategoriesPercentage,
    getExpensesPerBusiness,
    getIncomesPerBusiness,
    getNumberOfDifferentMonths,
  };
};

export default useMetrics;
