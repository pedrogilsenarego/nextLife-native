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

  //   const totalIncomesByBusiness = () =>
  //     expenses?.data?.reduce((accumulator, expense) => {
  //       const existingExpense = accumulator.find(
  //         (item) => item.businessId === expense.businessId
  //       );

  //       if (existingExpense) {
  //         existingExpense.amount += expense.amount;
  //       } else {
  //         accumulator.push({ ...expense });
  //       }

  //       return accumulator;
  //     }, []);

  return {
    totalExpenses,
    totalIncomes,
  };
};

export default useMetrics;
