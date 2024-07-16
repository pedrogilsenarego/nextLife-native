import { View, Text } from "react-native";
import { useSelectedTransactions } from "../TransactionContext";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import { Divider } from "@/components/Atoms/Divider";

export const TransactionContent = () => {
  const { selectedTransactionId, selectedMode } = useSelectedTransactions();
  const expenses = useExpenses();
  const incomes = useIncomes();
  const transaction =
    selectedMode === "expense"
      ? expenses?.data.find((expense) => expense.id === selectedTransactionId)
      : incomes?.data.find((incomes) => incomes.id === selectedTransactionId);

  return (
    <View style={{ paddingTop: 100 }}>
      <Divider />
      <Text>Amount: {transaction?.amount}</Text>
      <Text>Category: {transaction?.category}</Text>
      <Text>Note: {transaction?.note}</Text>
      <Text>Business: {transaction?.business?.business_name}</Text>
      <Text>Deposit: {transaction?.deposits?.deposit_name}</Text>
    </View>
  );
};
