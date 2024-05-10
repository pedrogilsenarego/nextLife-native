import { useApp } from "@/providers/AppProvider";
import { addMonths, format } from "date-fns";
import { View, Text, Pressable } from "react-native";

export const RangeDataChoose: React.FC = () => {
  const { dateRange, changeDateRange } = useApp();
  const currentDate = new Date();
  const lastMonth = addMonths(currentDate, -1);
  const lastLastMonth = addMonths(currentDate, -2);
  const currentMonth = format(currentDate, "MMMM");
  const lastMonthF = format(lastMonth, "MMMM");
  const lastLastMonthF = format(lastLastMonth, "MMMM");

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        columnGap: 15,

        paddingHorizontal: 10,
        paddingVertical: 4,
      }}
    >
      <Pressable onPress={() => changeDateRange("currentMonth")}>
        <Text
          style={{
            fontWeight: dateRange === "currentMonth" ? "bold" : "normal",
          }}
        >
          {currentMonth}
        </Text>
      </Pressable>
      <Pressable onPress={() => changeDateRange("lastMonth")}>
        <Text
          style={{ fontWeight: dateRange === "lastMonth" ? "bold" : "normal" }}
        >
          {lastMonthF}
        </Text>
      </Pressable>
      <Pressable onPress={() => changeDateRange("lastLastMonth")}>
        <Text
          style={{
            fontWeight: dateRange === "lastLastMonth" ? "bold" : "normal",
          }}
        >
          {lastLastMonthF}
        </Text>
      </Pressable>
      <Text>3 M</Text>
      <Text>6 M</Text>
      <Text>1 Y</Text>
      <Text>3 Y</Text>
    </View>
  );
};
