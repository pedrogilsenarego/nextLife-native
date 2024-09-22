import { getReports } from "@/actions/reportsActions";
import { queryKeys } from "@/constants/queryKeys";
import { useApp } from "@/providers/AppProvider";
import { ReportsQuery } from "@/types/reportsTypes";
import { dateQueriesMap } from "@/utils/dateFormat";
import { useQuery } from "@tanstack/react-query";

const useReports = () => {
  const { dateRange } = useApp();
  const datesToQuery = dateQueriesMap(dateRange);
  const reports = useQuery<ReportsQuery, Error>({
    queryKey: [queryKeys.reports, dateRange],
    queryFn: () =>
      getReports({
        timeRange: {
          startDate: datesToQuery.startDate,
          endDate: datesToQuery.endDate,
        },
      }),
  });

  return reports;
};

export default useReports;
