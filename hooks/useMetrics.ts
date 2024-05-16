import { Expense } from "@/types/expensesTypes";

import useExpenses from "./useExpenses";
import useIncomes from "./useIncomes";
import { Income } from "@/types/incomesTypes";

import { useApp } from "@/providers/AppProvider";
import { dateQueriesMap, getMonthAbbreviation } from "@/utils/dateFormat";

const useMetrics = () => {
  const expenses = useExpenses();
  const incomes = useIncomes();
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

    // Initialize array with 0 values for each month of the year
    for (let year = startYear; year <= endYear; year++) {
      // Calculate the start and end month for the current year
      const monthStart = year === startYear ? startMonth : 1;

      const monthEnd = year === endYear ? endMonth : 12;

      // Initialize array with 0 values for each month of the year
      for (let month = monthStart; month <= monthEnd; month++) {
        const label = `${getMonthAbbreviation(month)} ${year % 100}`;

        totalPerMonth.push({ label, value: 0 });
      }
    }

    // Update values for months coinciding with original data
    if (data) {
      data.forEach((expense) => {
        const expenseDate = new Date(expense.created_at);
        const expenseYear = expenseDate.getFullYear();
        const expenseMonth = expenseDate.getMonth() + 1; // Adding 1 to get 1-based month index

        // Check if the expense falls within the date range
        if (
          expenseYear >= startYear &&
          expenseYear <= endYear &&
          ((startYear === endYear &&
            expenseMonth >= startMonth &&
            expenseMonth <= endMonth) ||
            (expenseYear === startYear && expenseMonth >= startMonth) ||
            (expenseYear === endYear && expenseMonth <= endMonth))
        ) {
          const yearIndex = expenseYear - startYear;
          const monthIndex =
            yearIndex === 0
              ? expenseMonth - startMonth
              : 12 + expenseMonth - startMonth;
          totalPerMonth[monthIndex].value += expense.amount;
        }
      });
    }

    return totalPerMonth;
  };

  const calculateCategoryPercentage = (expensesData: Expense[]) => {
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
      .filter((item) => item.percentage < 4)
      .reduce(
        (stats, item) => {
          stats.totalPercentage += item.percentage;
          stats.totalAmount += item.amount;
          return stats;
        },
        { totalPercentage: 0, totalAmount: 0 }
      );

    const filteredCategoryPercentage = categoryPercentage
      .filter((item) => item.percentage >= 4)
      .sort((a, b) => b.percentage - a.percentage)
      .concat({
        category: "Other",
        percentage: parseFloat(totalSmallPercentage.totalPercentage.toFixed(1)),
        amount: parseFloat(totalSmallPercentage.totalAmount.toFixed(1)),
      });

    return filteredCategoryPercentage;
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

  return {
    totalExpenses,
    totalIncomes,
    expensesTotalPerDay,
    incomesTotalPerDay,
    expensesTotalPerMonth,
    incomesTotalPerMonth,
    getExpensesCategoriesPercentage,
    getIncomesCategoriesPercentage,
  };
};

export default useMetrics;
