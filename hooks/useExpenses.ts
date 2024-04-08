import { queryKeys } from "@/constants/queryKeys";
import { ExpensesQuery } from "@/types/expensesTypes";
import { useQuery } from "@tanstack/react-query";
import { dateQueriesMap } from "@/utils/dateFormat";
import { getExpenses } from "@/actions/expensesActions";
import useUser from "./useUser";

const useExpenses = () => {
  const user = useUser();
  const datesToQuery = dateQueriesMap("currentMonth");
  const expenses = useQuery<ExpensesQuery, Error>({
    queryKey: [queryKeys.expenses],
    queryFn: () =>
      getExpenses({
        timeRange: {
          startDate: datesToQuery.startDate,
          endDate: datesToQuery.endDate,
        },
        userId: user.data?.id || "",
      }),
  });

  return expenses;
};

export default useExpenses;
