import LineChart from "@/components/Charts/LineChart";
import AnimatedText from "@/components/Charts/LineChart/AnimatedText";
import useMetrics from "@/hooks/useMetrics";
import { useTheme } from "@/providers/ThemeContext";
import { useFont } from "@shopify/react-native-skia";
import { useState } from "react";
import { View, Text } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Subcard from "./Subcard";

type Props = {
  selectedStatus: "expenses" | "incomes" | "both";
  setSelectedStatus: (selectedStatus: "expenses" | "incomes" | "both") => void;
};

const ChartInitial = ({ selectedStatus, setSelectedStatus }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>("Total");
  const selectedValue = useSharedValue(0);
  const accValue = useSharedValue(0);

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
        data={selectedStatus === "expenses" ? expensesPerDay : incomesPerDay}
        selectedValue={selectedValue}
        accValue={accValue}
        setSelectedDate={setSelectedDate}
      />
      <Subcard
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedValue={selectedValue}
        accValue={accValue}
        expensesPerDay={expensesPerDay}
      />
    </View>
  );
};

export default ChartInitial;
