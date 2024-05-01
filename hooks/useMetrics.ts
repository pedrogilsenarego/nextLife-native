import { Expense } from "@/types/expensesTypes";
import useBusinesses from "./useBusinesses";
import useExpenses from "./useExpenses";
import useIncomes from "./useIncomes";
import { Income } from "@/types/incomesTypes";
import { useMemo } from "react";

const useMetrics = () => {
  const expenses = useExpenses();
  const incomes = useIncomes();
  const business = useBusinesses();

  const totalExpenses = () =>
    expenses?.data?.reduce((acc, item) => {
      return acc + item.amount;
    }, 0) ?? 0;

  const totalIncomes = () =>
    incomes?.data?.reduce((acc, item) => {
      return acc + item.amount;
    }, 0) ?? 0;

  const valueTotalPerDay = (data: Expense[] | Income[] | undefined) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    const totalPerDay: { label: string; value: number }[] = [];

    // Initialize array with 0 values for each day of the month
    for (let i = 1; i <= currentDay; i++) {
      const label = i.toString().padStart(2, "0");
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
      .filter((item) => item.percentage < 5)
      .reduce(
        (stats, item) => {
          stats.totalPercentage += item.percentage;
          stats.totalAmount += item.amount;
          return stats;
        },
        { totalPercentage: 0, totalAmount: 0 }
      );

    const filteredCategoryPercentage = categoryPercentage
      .filter((item) => item.percentage >= 5)
      .sort((a, b) => b.percentage - a.percentage)
      .concat({
        category: "Other",
        percentage: totalSmallPercentage.totalPercentage,
        amount: totalSmallPercentage.totalAmount,
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

  const expensesTotalPerDay = () =>
    useMemo(() => valueTotalPerDay(expenses?.data), [expenses]);
  const incomesTotalPerDay = () =>
    useMemo(() => valueTotalPerDay(incomes?.data), [incomes]);

  return {
    totalExpenses,
    totalIncomes,
    expensesTotalPerDay,
    incomesTotalPerDay,
    getExpensesCategoriesPercentage,
    getIncomesCategoriesPercentage,
  };
};

export default useMetrics;
