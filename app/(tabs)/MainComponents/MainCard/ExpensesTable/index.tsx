import { FlatList } from "react-native-gesture-handler";
import Item from "./Item";
import useExpenses from "@/hooks/useExpenses";
import { useMemo } from "react";
import { View, Text } from "react-native";
import useIncomes from "@/hooks/useIncomes";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { useApp } from "@/providers/AppProvider";
import { listPerDay } from "@/utils/dateFormat";
import { format } from "date-fns";
import BottomPopup from "@/components/BottomPopup";
import { TransactionContent } from "./TransactionContent";
import { useSelectedTransactions } from "./TransactionContext";

type Props = {
  selectedStatus: "expenses" | "incomes" | "both";

  amountToShow: number;
};

const ExpensesTable = ({ selectedStatus, amountToShow }: Props) => {
  const { dateRange, selectedDate } = useApp();
  const expenses = useExpenses();
  const incomes = useIncomes();
  const { selectedTransactionId, setSelectedTransactionId } =
    useSelectedTransactions();

  const incomesData = useMemo(() => {
    return (
      incomes.data?.map((income) => ({
        ...income,
        type: "income",
      })) || []
    );
  }, [incomes.data]);

  const expensesData = useMemo(
    () =>
      expenses.data?.map((expense) => ({
        ...expense,
        type: "expense",
      })) || [],
    [expenses.data]
  );

  const mergedData = useMemo(() => {
    const combinedData = [
      ...(incomes.data?.map((income) => ({
        ...income,
        type: "income",
      })) || []),
      ...(expenses.data?.map((expense) => ({
        ...expense,
        type: "expense",
      })) || []),
    ];
    // Sort the combined data by created_at
    const sortedData = combinedData.sort((a, b) => {
      // Convert created_at to Date objects for comparison
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      // Compare the dates
      return dateB.getTime() - dateA.getTime();
    });
    return sortedData;
  }, [expenses.data, incomes.data]);

  const dataSelected =
    selectedStatus === "expenses"
      ? expensesData
      : selectedStatus === "incomes"
      ? incomesData
      : mergedData;

  const dataToShow =
    selectedDate !== "Total"
      ? dataSelected
          .filter((item) => {
            const date = new Date(item.created_at);
            const formatedDate = listPerDay.includes(dateRange)
              ? format(date, "d")
              : format(date, "MMM yy");

            return formatedDate === selectedDate;
          })
          .slice(0, amountToShow)
      : dataSelected.slice(0, amountToShow);

  return (
    <>
      <View
        style={{
          backgroundColor: "#ffffff1A",

          paddingTop: 4,
        }}
      >
        <FlatList
          data={dataToShow}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeInDown.delay(index * 150)}
              exiting={FadeOutDown}
            >
              <Item expense={item} />
            </Animated.View>
          )}
        />
      </View>
      <BottomPopup
        openModal={!!selectedTransactionId}
        onClose={() => setSelectedTransactionId(null)}
      >
        <TransactionContent />
      </BottomPopup>
    </>
  );
};

export default ExpensesTable;
