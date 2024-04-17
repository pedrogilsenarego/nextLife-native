import { Expense } from "@/types/expensesTypes";
import useBusinesses from "./useBusinesses";
import useExpenses from "./useExpenses";
import useIncomes from "./useIncomes";
import { Income } from "@/types/incomesTypes";

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

  const expensesTotalPerDay = () => valueTotalPerDay(expenses?.data);
  const incomesTotalPerDay = () => valueTotalPerDay(incomes?.data);

  return {
    totalExpenses,
    totalIncomes,
    expensesTotalPerDay,
    incomesTotalPerDay,
  };
};

export default useMetrics;
