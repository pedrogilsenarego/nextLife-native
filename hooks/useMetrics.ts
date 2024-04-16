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
    const expensesPerDay: { [date: string]: number } = {};
    if (!data) return [];
    data?.forEach((expense) => {
      const expenseDate = new Date(expense.created_at).toLocaleDateString(
        "en-US",
        { day: "2-digit" }
      );

      if (!expensesPerDay[expenseDate]) {
        expensesPerDay[expenseDate] = 0;
      }

      expensesPerDay[expenseDate] += expense.amount;
    });

    const totalPerDay = Object.entries(expensesPerDay).map(([date, total]) => ({
      label: date,
      value: total,
    }));

    totalPerDay.sort((a, b) => {
      return Number(a.label) - Number(b.label);
    });

    const result = [];
    if (totalPerDay.length > 0) {
      for (let i = 0; i < totalPerDay.length - 1; i++) {
        result.push(totalPerDay[i]);
        const currentLabel = parseInt(totalPerDay[i].label);
        const nextLabel = parseInt(totalPerDay[i + 1].label);
        if (nextLabel - currentLabel > 1) {
          for (let j = currentLabel + 1; j < nextLabel; j++) {
            result.push({ label: j.toString().padStart(2, "0"), value: 0 });
          }
        }
      }
      result.push(totalPerDay[totalPerDay.length - 1]);
    }

    return result;
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
