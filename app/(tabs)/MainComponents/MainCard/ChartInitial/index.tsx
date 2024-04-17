import LineChart from "@/components/Charts/LineChart";
import useMetrics from "@/hooks/useMetrics";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { useFont } from "@shopify/react-native-skia";
import { useState } from "react";
import { View, Text } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Subcard from "./Subcard";

type Props = {
  selectedStatus: "expenses" | "incomes" | "both";
  setSelectedStatus: (selectedStatus: "expenses" | "incomes" | "both") => void;
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};

const ChartInitial = ({
  selectedStatus,
  setSelectedStatus,
  selectedDate,
  setSelectedDate,
}: Props) => {
  const selectedValue = useSharedValue(0);
  const accValue = useSharedValue(0);
  const { contrastColor } = useTheme();
  const { expensesTotalPerDay, incomesTotalPerDay } = useMetrics();
  const expensesPerDay = expensesTotalPerDay();
  const incomesPerDay = incomesTotalPerDay();

  const font = useFont(
    require("../../../../../assets/fonts/SpaceMono-Regular.ttf"),
    18
  );

  if (
    !font ||
    expensesPerDay.length <= 0 ||
    !expensesPerDay ||
    incomesPerDay.length <= 0 ||
    !incomesPerDay
  ) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: "column",
      }}
    >
      <LineChart
        color1={selectedStatus === "expenses" ? Colors.red : contrastColor}
        color2={selectedStatus === "both" ? Colors.red : undefined}
        data={selectedStatus === "expenses" ? expensesPerDay : incomesPerDay}
        data2={selectedStatus === "both" ? expensesPerDay : undefined}
        selectedValue={selectedValue}
        selectedDate={selectedDate}
        accValue={accValue}
        setSelectedDate={setSelectedDate}
      />
      <Subcard
        selectedStatus={selectedStatus}
        setSelectedDate={setSelectedDate}
        setSelectedStatus={setSelectedStatus}
        selectedValue={selectedValue}
        accValue={accValue}
        expensesPerDay={expensesPerDay}
        incomesPerDay={incomesPerDay}
      />
    </View>
  );
};

export default ChartInitial;
