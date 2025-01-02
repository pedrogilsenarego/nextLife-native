import useMetrics from "@/hooks/useMetrics";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { View, Text, Pressable } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Subcard from "./Subcard";
import { MaterialIcons } from "@expo/vector-icons";
import { useApp } from "@/providers/AppProvider";
import { LineChartGifted } from "@/components/Charts/LIneChartGifted";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import LoaderSpinner from "@/components/Atoms/LoaderSpinner";
import { listPerDay } from "@/utils/dateFormat";
import BarChart from "@/components/Charts/BarChart/BarChart";

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
  const expenses = useExpenses({
    businessSelected: selectedBusiness,
    selectedCategory,
  });
  const incomes = useIncomes({
    businessSelected: selectedBusiness,
    selectedCategory,
  });

  const { dateRange } = useApp();
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

  type DataType = {
    label: string;
    value: number;
    value2?: number;
  };

  const mergeExpensesAndIncomes = (
    expenses: { label: string; value: number }[],
    incomes: { label: string; value: number }[]
  ): DataType[] => {
    return expenses.map((expense) => {
      const matchingIncome = incomes.find(
        (income) => income.label === expense.label
      );

      return {
        label: expense.label,
        value: expense.value,
        value2: matchingIncome ? matchingIncome.value : undefined,
      };
    });
  };

  return (
    <View
      style={{
        flexDirection: "column",
        position: "relative",
      }}
    >
      <View>
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
          <View style={{ marginTop: 20 }}>
            <BarChart
              color={
                selectedStatus === "incomes" || selectedStatus === "both"
                  ? "#82ca9d"
                  : undefined
              }
              data={
                selectedStatus === "expenses"
                  ? expensesPerDay
                  : selectedStatus === "incomes"
                  ? incomesPerDay
                  : mergeExpensesAndIncomes(incomesPerDay, expensesPerDay)
              }
            />
          </View>
        )}
      </View>
      <View style={{ marginTop: 20 }}>
        <Subcard
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          expensesPerDay={expensesPerDay}
          incomesPerDay={incomesPerDay}
          setAmountToShow={setAmountToShow}
        />
      </View>
    </View>
  );
};

export default ChartInitial;
