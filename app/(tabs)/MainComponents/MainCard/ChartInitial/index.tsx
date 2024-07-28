import LineChart from "@/components/Charts/LineChart";
import useMetrics from "@/hooks/useMetrics";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { useFont } from "@shopify/react-native-skia";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Subcard from "./Subcard";
import { MaterialIcons } from "@expo/vector-icons";
import { RangeDataChoose } from "../../../../../components/Molecules/RangeDataChoose";
import { useApp } from "@/providers/AppProvider";
import { LineChartGifted } from "@/components/Charts/LIneChartGifted";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import LoaderSpinner from "@/components/Atoms/LoaderSpinner";
import { listPerDay } from "@/utils/dateFormat";

type Props = {
  selectedStatus: "expenses" | "incomes" | "both";
  setSelectedStatus: (selectedStatus: "expenses" | "incomes" | "both") => void;
  selectedBusiness?: string;
  selectedCategory?: string;
  setAmountToShow: (value: number) => void;
};

const ChartInitial = ({
  selectedStatus,
  setSelectedStatus,
  selectedBusiness,
  selectedCategory,
  setAmountToShow,
}: Props) => {
  const accValue = useSharedValue(0);
  const accValue2 = useSharedValue(0);
  const expenses = useExpenses({
    businessSelected: selectedBusiness,
    selectedCategory,
  });
  const incomes = useIncomes({
    businessSelected: selectedBusiness,
    selectedCategory,
  });

  const { theme } = useTheme();
  const { dateRange, selectedDate, changeSelectedDate } = useApp();
  const {
    expensesTotalPerDay,
    expensesTotalPerMonth,
    incomesTotalPerMonth,
    incomesTotalPerDay,
  } = useMetrics({ businessSelected: selectedBusiness, selectedCategory });

  const expensesPerDay = listPerDay.includes(dateRange)
    ? expensesTotalPerDay()
    : expensesTotalPerMonth();
  const incomesPerDay = listPerDay.includes(dateRange)
    ? incomesTotalPerDay()
    : incomesTotalPerMonth();

  const colorIncomes = theme === "dark" ? `${Colors.greenPuke}CC` : "#82ca9d";

  return (
    <View
      style={{
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Pressable
        style={{
          position: "absolute",
          right: 12,
          top: 20,
          zIndex: 100,
          backgroundColor: theme === "light" ? "white" : Colors.gray,
          padding: 4,
          borderRadius: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        onPress={() => {
          changeSelectedDate("Total");
        }}
      >
        <MaterialIcons
          name="settings-backup-restore"
          color={
            selectedDate === "Total"
              ? theme === "light"
                ? Colors.lightGray
                : "#ffffff66"
              : theme === "light"
              ? Colors.black
              : "whitesmoke"
          }
          size={22}
        />
      </Pressable>
      {expenses.isLoading || incomes.isLoading ? (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 233,
            width: "100%",
          }}
        >
          <LoaderSpinner color={Colors.black} />
        </View>
      ) : (
        <LineChartGifted
          data={selectedStatus === "expenses" ? expensesPerDay : incomesPerDay}
          data2={selectedStatus === "both" ? expensesPerDay : undefined}
          color1={selectedStatus === "expenses" ? "#c80815" : colorIncomes}
          color2={selectedStatus === "both" ? "#c80815" : undefined}
        />
      )}

      <Subcard
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        accValue={accValue}
        accValue2={accValue2}
        expensesPerDay={expensesPerDay}
        incomesPerDay={incomesPerDay}
        setAmountToShow={setAmountToShow}
      />
    </View>
  );
};

export default ChartInitial;
