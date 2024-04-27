import { Container } from "@/components/Atoms/Container";
import { ArrayButtons } from "@/components/Molecules/ArrayButtons";
import AnimatedText from "@/components/Charts/LineChart/AnimatedText";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useFont } from "@shopify/react-native-skia";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { LeftComponent } from "./LeftComponent";
import { RightComponent } from "./RightComponent";

type Props = {
  selectedDate: string;
  expensesPerDay: { value: number; label: string }[];
  incomesPerDay: { value: number; label: string }[];
  accValue: SharedValue<number>;
  accValue2: SharedValue<number>;
  selectedValue: SharedValue<number>;
  selectedValue2: SharedValue<number>;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  selectedStatus: "expenses" | "incomes" | "both";
  setSelectedStatus: (selectedStatus: "expenses" | "incomes" | "both") => void;
};

const Subcard = ({
  selectedDate,
  expensesPerDay,
  incomesPerDay,
  accValue,
  accValue2,
  selectedValue,
  selectedValue2,
  selectedStatus,
  setSelectedDate,
  setSelectedStatus,
}: Props) => {
  const currentDate = new Date();
  const { theme } = useTheme();
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long" });
  const totalExpenses = expensesPerDay
    .reduce((acc, value) => acc + value.value, 0)
    .toFixed(0);

  const totalIncomes = incomesPerDay
    .reduce((acc, value) => acc + value.value, 0)
    .toFixed(0);

  const font = useFont(
    require("../../../../../../assets/fonts/OpenSans-Regular.ttf"),
    14
  );

  if (!font || !expensesPerDay.length) {
    return null;
  }

  return (
    <Container containerStyles={{ marginTop: 10 }}>
      <LeftComponent
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
      <RightComponent
        setSelectedDate={setSelectedDate}
        setSelectedStatus={setSelectedStatus}
        selectedValue={selectedValue}
        accValue={accValue}
      />
    </Container>
  );
};

export default Subcard;
