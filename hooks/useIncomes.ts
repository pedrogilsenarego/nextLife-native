import { queryKeys } from "@/constants/queryKeys";

import { useQuery } from "@tanstack/react-query";
import { dateQueriesMap } from "@/utils/dateFormat";

import useUser from "./useUser";

import { getIncomes } from "@/actions/incomesActions";
import { IncomesQuery } from "@/types/incomesTypes";

const useIncomes = () => {
  const user = useUser();
  const datesToQuery = dateQueriesMap("currentMonth");
  const expenses = useQuery<IncomesQuery, Error>({
    queryKey: [queryKeys.incomes],
    queryFn: () =>
      getIncomes({
        timeRange: {
          startDate: datesToQuery.startDate,
          endDate: datesToQuery.endDate,
        },
      }),
  });

  return expenses;
};

export default useIncomes;
