import AnimatedText from "@/components/Charts/LineChart/AnimatedText";
import useMetrics from "@/hooks/useMetrics";
import { useState } from "react";
import { Text } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useFont } from "@shopify/react-native-skia";
import LineChart from "@/components/Charts/LineChart/LineChart";

const ChartInitial = () => {
  const [selectedDate, setSelectedDate] = useState<string>("Total");
  const selectedValue = useSharedValue(0);
  const { expensesTotalPerDay } = useMetrics();
  const expensesPerDay = expensesTotalPerDay();
  const font = useFont(
    require("../../../../assets/fonts/SpaceMono-Regular.ttf"),
    18
  );

  if (!font || !expensesPerDay.length) {
    return null;
  }

  return (
    <>
      <Text style={{ color: "white", fontSize: 28, textAlign: "center" }}>
        {selectedDate}
      </Text>
      <AnimatedText font={font} selectedValue={selectedValue} />
      <LineChart
        data={expensesPerDay}
        selectedValue={selectedValue}
        setSelectedDate={setSelectedDate}
      />
    </>
  );
};

export default ChartInitial;