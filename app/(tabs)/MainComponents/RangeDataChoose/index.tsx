import { DateRangeValues, useApp } from "@/providers/AppProvider";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { addMonths, format } from "date-fns";
import { View, Text, Pressable } from "react-native";

export const RangeDataChoose: React.FC = () => {
  const { dateRange, changeDateRange, changeSelectedDate } = useApp();
  const { theme } = useTheme();
  const currentDate = new Date();
  const lastMonth = addMonths(currentDate, -1);
  const lastLastMonth = addMonths(currentDate, -2);
  const currentMonth = format(currentDate, "MMMM");
  const lastMonthF = format(lastMonth, "MMMM");
  const lastLastMonthF = format(lastLastMonth, "MMMM");

  const handleChange = (key: DateRangeValues) => {
    changeSelectedDate("Total");
    changeDateRange(key);
  };

  return (
    <View
      style={{
        display: "flex",
        marginTop: 10,
        flexDirection: "row",
        columnGap: 15,
        backgroundColor:
          theme === "light" ? `${Colors.lightGray}CE` : Colors.gray,
        paddingHorizontal: 10,
        paddingVertical: 4,
      }}
    >
      <Pressable onPress={() => handleChange("currentMonth")}>
        <Text
          style={{
            color: theme === "light" ? "black" : "white",
            fontWeight: dateRange === "currentMonth" ? "bold" : "normal",
          }}
        >
          {currentMonth}
        </Text>
      </Pressable>
      <Pressable onPress={() => handleChange("lastMonth")}>
        <Text
          style={{
            fontWeight: dateRange === "lastMonth" ? "bold" : "normal",
            color: theme === "light" ? "black" : "white",
          }}
        >
          {lastMonthF}
        </Text>
      </Pressable>
      <Pressable onPress={() => handleChange("lastLastMonth")}>
        <Text
          style={{
            color: theme === "light" ? "black" : "white",
            fontWeight: dateRange === "lastLastMonth" ? "bold" : "normal",
          }}
        >
          {lastLastMonthF}
        </Text>
      </Pressable>
      <Pressable onPress={() => handleChange("3Months")}>
        <Text
          style={{
            color: theme === "light" ? "black" : "white",
            fontWeight: dateRange === "3Months" ? "bold" : "normal",
          }}
        >
          3 M
        </Text>
      </Pressable>
      <Text onPress={() => handleChange("6Months")}>
        <Text
          style={{
            color: theme === "light" ? "black" : "white",
            fontWeight: dateRange === "6Months" ? "bold" : "normal",
          }}
        >
          6 M
        </Text>
      </Text>
    </View>
  );
};
