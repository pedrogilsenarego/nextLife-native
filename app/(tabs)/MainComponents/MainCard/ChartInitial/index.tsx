import LineChart from "@/components/Charts/LineChart";
import AnimatedText from "@/components/Charts/LineChart/AnimatedText";
import useMetrics from "@/hooks/useMetrics";
import { useTheme } from "@/providers/ThemeContext";
import { useFont } from "@shopify/react-native-skia";
import { useState } from "react";
import { View, Text } from "react-native";
import { useSharedValue } from "react-native-reanimated";

const ChartInitial = () => {
  const [selectedDate, setSelectedDate] = useState<string>("Total");
  const selectedValue = useSharedValue(0);
  const accValue = useSharedValue(0);
  const currentDate = new Date();
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long" });
  const { expensesTotalPerDay } = useMetrics();
  const expensesPerDay = expensesTotalPerDay();
  const totalExpenses = expensesPerDay.reduce(
    (acc, value) => acc + value.value,
    0
  );

  const { mainColor, contrastColor } = useTheme();

  const font = useFont(
    require("../../../../../assets/fonts/SpaceMono-Regular.ttf"),
    18
  );

  if (!font || !expensesPerDay.length) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: "column",
      }}
    >
      <LineChart
        data={expensesPerDay}
        selectedValue={selectedValue}
        accValue={accValue}
        setSelectedDate={setSelectedDate}
      />
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#ffffff1A",
          padding: 10,
          borderRadius: 4,
          justifyContent: "space-between",
          columnGap: 5,
          alignItems: "flex-start",
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

          <Text
            style={{ color: "whitesmoke", fontWeight: "600", marginTop: 10 }}
          >
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
          <View
            style={{
              backgroundColor: mainColor,
              borderRadius: 20,
              padding: 6,
              justifyContent: "center",
            }}
          >
            <Text
              style={{ color: contrastColor, fontSize: 13, lineHeight: 14 }}
            >
              Expenses
            </Text>
          </View>
          <View
            style={{
              borderRadius: 14,
              padding: 6,
            }}
          >
            <Text
              style={{
                color: contrastColor,
                opacity: 0.7,
                fontSize: 13,
                lineHeight: 14,
              }}
            >
              Incomes
            </Text>
          </View>
          <View
            style={{
              borderRadius: 14,
              padding: 6,
            }}
          >
            <Text
              style={{
                color: contrastColor,
                opacity: 0.7,
                fontSize: 13,
                lineHeight: 14,
              }}
            >
              Both
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChartInitial;
