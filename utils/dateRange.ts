import { DateRangeValues } from "@/providers/AppProvider";

export const singleMonth = (dateRange: DateRangeValues) => {
  if (
    dateRange === "currentMonth" ||
    dateRange === "lastLastMonth" ||
    dateRange === "lastMonth"
  )
    return true;
  return false;
};
