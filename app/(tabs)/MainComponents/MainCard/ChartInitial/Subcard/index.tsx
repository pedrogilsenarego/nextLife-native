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
      <View
        style={{
          backgroundColor: "#ffffff1A",

          borderRadius: 24,
          flexDirection: "row",
          padding: 4,

          columnGap: 8,
        }}
      >
        <Pressable
          onPress={() => setSelectedStatus("expenses")}
          style={{
            backgroundColor:
              selectedStatus === "expenses" ? mainColor : "transparent",
            borderRadius: 20,
            padding: 6,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: contrastColor,
              fontSize: 13,
              lineHeight: 14,
              opacity: selectedStatus === "expenses" ? 1 : 0.7,
            }}
          >
            Expenses
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedStatus("incomes")}
          style={{
            backgroundColor:
              selectedStatus === "incomes" ? mainColor : "transparent",
            borderRadius: 14,
            padding: 6,
          }}
        >
          <Text
            style={{
              color: contrastColor,
              opacity: selectedStatus === "incomes" ? 1 : 0.7,
              fontSize: 13,
              lineHeight: 14,
            }}
          >
            Incomes
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedStatus("both")}
          style={{
            backgroundColor:
              selectedStatus === "both" ? mainColor : "transparent",
            borderRadius: 14,
            padding: 6,
          }}
        >
          <Text
            style={{
              color: contrastColor,
              opacity: selectedStatus === "both" ? 1 : 0.7,
              fontSize: 13,
              lineHeight: 14,
            }}
          >
            Both
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Subcard;
