import { ArrayButtons } from "@/components/Buttons/ArrayButtons";
import AnimatedText from "@/components/Charts/LineChart/AnimatedText";
import { useTheme } from "@/providers/ThemeContext";
import { useFont } from "@shopify/react-native-skia";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SharedValue } from "react-native-reanimated";

type Props = {
  expensesPerDay: { value: number; label: string }[];
  incomesPerDay: { value: number; label: string }[];
  accValue: SharedValue<number>;
  selectedValue: SharedValue<number>;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  selectedStatus: "expenses" | "incomes" | "both";
  setSelectedStatus: (selectedStatus: "expenses" | "incomes" | "both") => void;
};

const Subcard = ({
  expensesPerDay,
  incomesPerDay,
  accValue,
  selectedValue,
  selectedStatus,
  setSelectedDate,
  setSelectedStatus,
}: Props) => {
  const currentDate = new Date();

  const monthName = currentDate.toLocaleDateString("en-US", { month: "long" });
  const totalExpenses = expensesPerDay
    .reduce((acc, value) => acc + value.value, 0)
    .toFixed(0);

  const totalIncomes = incomesPerDay
    .reduce((acc, value) => acc + value.value, 0)
    .toFixed(0);

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
        {selectedStatus === "expenses" && (
          <Text
            style={{ color: "whitesmoke", fontWeight: "600", marginTop: 8 }}
          >
            Expenses {monthName}: {totalExpenses}
          </Text>
        )}
        {selectedStatus === "incomes" && (
          <Text
            style={{ color: "whitesmoke", fontWeight: "600", marginTop: 8 }}
          >
            Incomes {monthName}: {totalIncomes}
          </Text>
        )}
        {selectedStatus === "both" && (
          <Text
            style={{ color: "whitesmoke", fontWeight: "600", marginTop: 8 }}
          >
            I/E {monthName}: {totalIncomes}/{totalExpenses}
          </Text>
        )}
      </View>
      <ArrayButtons
        buttons={["expenses", "incomes", "both"]}
        onSelected={(selected) => {
          setSelectedStatus(selected);
          setSelectedDate("Total");
          accValue.value = 0;
          selectedValue.value = 0;
        }}
      />
    </View>
  );
};

export default Subcard;
