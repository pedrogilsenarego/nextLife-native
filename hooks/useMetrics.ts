import useBusinesses from "./useBusinesses";
import useExpenses from "./useExpenses";
import useIncomes from "./useIncomes";

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

  const expensesTotalPerDay = () => {
    const expensesPerDay: { [date: string]: number } = {}; // Type annotation for expensesPerDay

    expenses?.data?.forEach((expense) => {
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
      return a.value - b.value;
    });

    return totalPerDay;
  };

  return {
    totalExpenses,
    totalIncomes,
    expensesTotalPerDay,
  };
};

export default useMetrics;
