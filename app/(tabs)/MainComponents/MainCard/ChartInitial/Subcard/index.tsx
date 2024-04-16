import { ArrayButtons } from "@/components/Buttons/ArrayButtons";
import AnimatedText from "@/components/Charts/LineChart/AnimatedText";
import { useTheme } from "@/providers/ThemeContext";
import { useFont } from "@shopify/react-native-skia";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SharedValue } from "react-native-reanimated";

type Props = {
  expensesPerDay: { value: number; label: string }[];
  accValue: SharedValue<number>;
  selectedValue: SharedValue<number>;
  selectedStatus: "expenses" | "incomes" | "both";
  setSelectedStatus: (selectedStatus: "expenses" | "incomes" | "both") => void;
};

const Subcard = ({
  expensesPerDay,
  accValue,
  selectedValue,
  selectedStatus,
  setSelectedStatus,
}: Props) => {
  const currentDate = new Date();

  const monthName = currentDate.toLocaleDateString("en-US", { month: "long" });
  const totalExpenses = expensesPerDay
    .reduce((acc, value) => acc + value.value, 0)
    .toFixed(0);
  const { mainColor, contrastColor } = useTheme();

  const font = useFont(
    require("../../../../../../assets/fonts/SpaceMono-Regular.ttf"),
    18
  );

  if (!font || !expensesPerDay.length) {
    return null;
  }
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#ffffff1A",
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 8,
        borderTopEndRadius: 4,
        borderTopStartRadius: 4,
        justifyContent: "space-between",
        columnGap: 5,
        alignItems: "flex-start",
        marginTop: 10,
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",

            columnGap: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "whitesmoke" }}>Acc:</Text>

          <AnimatedText font={font} selectedValue={accValue} />
        </View>
        <View
          style={{
            flexDirection: "row",

            columnGap: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "whitesmoke" }}>Day:</Text>

          <AnimatedText font={font} selectedValue={selectedValue} />
        </View>
        <Text style={{ color: "whitesmoke", fontWeight: "600", marginTop: 8 }}>
          Expenses {monthName}: {totalExpenses}
        </Text>
      </View>
      <ArrayButtons
        buttons={["expenses", "incomes", "both"]}
        onSelected={(selected) => setSelectedStatus(selected)}
      />
    </View>
  );
};

export default Subcard;
