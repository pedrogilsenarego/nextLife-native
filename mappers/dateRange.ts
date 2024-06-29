import { DateRangeValues } from "@/providers/AppProvider";
import { addMonths, format } from "date-fns";

export const dateRangeLabel = (dateRange: DateRangeValues) => {
  const currentDate = new Date();
  const lastMonth = addMonths(currentDate, -1);
  const lastLastMonth = addMonths(currentDate, -2);
  const currentMonth = format(currentDate, "MMMM");
  const lastMonthF = format(lastMonth, "MMMM");
  const lastLastMonthF = format(lastLastMonth, "MMMM");
  switch (dateRange) {
    case "1year":
      return "1Y";
    case "3years":
      return "3Y";
    case "3Months":
      return "3M";
    case "6Months":
      return "6M";
    case "currentMonth":
      return currentMonth;
    case "lastLastMonth":
      return lastLastMonthF;
    case "lastMonth":
      return lastMonthF;
    default:
      return "";
  }
};
