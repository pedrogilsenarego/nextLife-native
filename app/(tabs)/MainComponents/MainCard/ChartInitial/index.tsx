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
        {/* <Pressable
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
        </Pressable> */}
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
          // <LineChartGifted
          //   data={
          //     selectedStatus === "expenses" ? expensesPerDay : incomesPerDay
          //   }
          //   data2={selectedStatus === "both" ? expensesPerDay : undefined}
          //   color1={selectedStatus === "expenses" ? "#c80815" : colorIncomes}
          //   color2={selectedStatus === "both" ? "#c80815" : undefined}
          // />
        )}
      </View>
      <View style={{ marginTop: 20 }}>
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
    </View>
  );
};

export default ChartInitial;
