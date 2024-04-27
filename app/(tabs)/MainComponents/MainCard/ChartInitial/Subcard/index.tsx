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
  setAmountToShow: (value: number) => void;
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
  setAmountToShow,
}: Props) => {
  if (!expensesPerDay.length) {
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
        setAmountToShow={setAmountToShow}
      />
    </Container>
  );
};

export default Subcard;
