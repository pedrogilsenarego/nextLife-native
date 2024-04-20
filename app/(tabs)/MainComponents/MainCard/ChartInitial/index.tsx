import LineChart from "@/components/Charts/LineChart";
import useMetrics from "@/hooks/useMetrics";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { useFont } from "@shopify/react-native-skia";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Subcard from "./Subcard";
import { MaterialIcons } from "@expo/vector-icons";

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
  const selectedValue2 = useSharedValue(0);
  const accValue = useSharedValue(0);
  const accValue2 = useSharedValue(0);
  const { contrastColor, theme } = useTheme();
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
        position: "relative",
      }}
    >
      <Pressable
        style={{ position: "absolute", right: 12, top: 20, zIndex: 100 }}
        onPress={() => {
          setSelectedDate("Total");
        }}
      >
        <MaterialIcons
          name="settings-backup-restore"
          color={
            selectedDate === "Total"
              ? theme === "light"
                ? "whitesmoke"
                : "#ffffff66"
              : theme === "light"
              ? Colors.lightGray
              : "whitesmoke"
          }
          size={22}
        />
      </Pressable>
      <LineChart
        color1={selectedStatus === "expenses" ? "#c80815" : "#82ca9d"}
        color2={selectedStatus === "both" ? "#c80815" : undefined}
        data={selectedStatus === "expenses" ? expensesPerDay : incomesPerDay}
        data2={selectedStatus === "both" ? expensesPerDay : undefined}
        selectedValue={selectedValue}
        selectedValue2={selectedValue2}
        selectedDate={selectedDate}
        accValue={accValue}
        accValue2={accValue2}
        setSelectedDate={setSelectedDate}
      />
      <Subcard
        selectedDate={selectedDate}
        selectedStatus={selectedStatus}
        setSelectedDate={setSelectedDate}
        setSelectedStatus={setSelectedStatus}
        selectedValue={selectedValue}
        selectedValue2={selectedValue2}
        accValue={accValue}
        accValue2={accValue2}
        expensesPerDay={expensesPerDay}
        incomesPerDay={incomesPerDay}
      />
    </View>
  );
};

export default ChartInitial;
