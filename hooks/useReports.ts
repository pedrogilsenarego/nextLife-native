import { getReports } from "@/actions/reportsActions";
import { queryKeys } from "@/constants/queryKeys";
import { ReportsQuery } from "@/types/reportsTypes";
import { useQuery } from "@tanstack/react-query";

const useReports = () => {
  const reports = useQuery<ReportsQuery, Error>({
    queryKey: [queryKeys.reports],
    queryFn: getReports,
  });

  return reports;
};

export default useReports;
