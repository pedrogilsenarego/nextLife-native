import { ArrayButtons } from "@/components/Buttons/ArrayButtons";
import AnimatedText from "@/components/Charts/LineChart/AnimatedText";
import { useTheme } from "@/providers/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useFont } from "@shopify/react-native-skia";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SharedValue } from "react-native-reanimated";

type Props = {
  selectedDate: string;
  expensesPerDay: { value: number; label: string }[];
  incomesPerDay: { value: number; label: string }[];
  accValue: SharedValue<number>;
  selectedValue: SharedValue<number>;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  selectedStatus: "expenses" | "incomes" | "both";
  setSelectedStatus: (selectedStatus: "expenses" | "incomes" | "both") => void;
};

const Subcard = ({
  selectedDate,
  expensesPerDay,
  incomesPerDay,
  accValue,
  selectedValue,
  selectedStatus,
  setSelectedDate,
  setSelectedStatus,
}: Props) => {
  const currentDate = new Date();
  const { contrastColor } = useTheme();
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
        paddingVertical: 15,
        paddingHorizontal: 10,

        borderTopEndRadius: 4,
        borderTopStartRadius: 4,
        justifyContent: "space-between",
        columnGap: 5,
        alignItems: "flex-start",
        marginTop: 10,
      }}
    >
      <View>
        <>
          <View
            style={{
              flexDirection: "row",

              columnGap: 5,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "whitesmoke",
              }}
            >
              {selectedDate === "Total" ? "Day:" : `Day(${selectedDate}):`}
            </Text>
            {selectedDate !== "Total" ? (
              <AnimatedText font={font} selectedValue={selectedValue} />
            ) : (
              <Text style={{ color: "whitesmoke" }}> -</Text>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",

              columnGap: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "whitesmoke" }}>Acc:</Text>
            {selectedDate !== "Total" ? (
              <AnimatedText font={font} selectedValue={accValue} />
            ) : (
              <Text style={{ color: "whitesmoke" }}> -</Text>
            )}
          </View>
        </>

        {selectedStatus === "expenses" && (
          <Text
            style={{ color: "whitesmoke", fontWeight: "600", marginTop: 8 }}
          >
            {monthName}: {totalExpenses}€
          </Text>
        )}
        {selectedStatus === "incomes" && (
          <Text
            style={{ color: "whitesmoke", fontWeight: "600", marginTop: 8 }}
          >
            {monthName}: {totalIncomes}€
          </Text>
        )}
        {selectedStatus === "both" && (
          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <Text style={{ color: "whitesmoke", fontWeight: "600" }}>
              {monthName}:{" "}
            </Text>
            <Text style={{ color: contrastColor, fontWeight: "600" }}>
              {totalIncomes}€
            </Text>
            <Text style={{ color: "whitesmoke", fontWeight: "600" }}> / </Text>
            <Text style={{ color: "red", fontWeight: "600" }}>
              {totalExpenses}€
            </Text>
          </View>
        )}
      </View>
      <View>
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
    </View>
  );
};

export default Subcard;
