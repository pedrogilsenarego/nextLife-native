import { DateRangeValues, useApp } from "@/providers/AppProvider";
import { Colors } from "@/providers/ThemeContext";
import { addMonths, format } from "date-fns";
import { View, Text, Pressable } from "react-native";

type Props = {
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};

export const RangeDataChoose: React.FC<Props> = ({ setSelectedDate }) => {
  const { dateRange, changeDateRange } = useApp();
  const currentDate = new Date();
  const lastMonth = addMonths(currentDate, -1);
  const lastLastMonth = addMonths(currentDate, -2);
  const currentMonth = format(currentDate, "MMMM");
  const lastMonthF = format(lastMonth, "MMMM");
  const lastLastMonthF = format(lastLastMonth, "MMMM");

  const handleChange = (key: DateRangeValues) => {
    setSelectedDate("Total");
    changeDateRange(key);
  };

  return (
    <View
      style={{
        display: "flex",
        marginTop: 10,
        flexDirection: "row",
        columnGap: 15,
        backgroundColor: `${Colors.lightGray}CE`,
        paddingHorizontal: 10,
        paddingVertical: 4,
      }}
    >
      <Pressable onPress={() => handleChange("currentMonth")}>
        <Text
          style={{
            fontWeight: dateRange === "currentMonth" ? "bold" : "normal",
          }}
        >
          {currentMonth}
        </Text>
      </Pressable>
      <Pressable onPress={() => handleChange("lastMonth")}>
        <Text
          style={{ fontWeight: dateRange === "lastMonth" ? "bold" : "normal" }}
        >
          {lastMonthF}
        </Text>
      </Pressable>
      <Pressable onPress={() => handleChange("lastLastMonth")}>
        <Text
          style={{
            fontWeight: dateRange === "lastLastMonth" ? "bold" : "normal",
          }}
        >
          {lastLastMonthF}
        </Text>
      </Pressable>
      <Pressable onPress={() => handleChange("3Months")}>
        <Text
          style={{
            fontWeight: dateRange === "3Months" ? "bold" : "normal",
          }}
        >
          3 M
        </Text>
      </Pressable>
      <Text onPress={() => handleChange("6Months")}>
        <Text
          style={{
            fontWeight: dateRange === "6Months" ? "bold" : "normal",
          }}
        >
          6 M
        </Text>
      </Text>
    </View>
  );
};
