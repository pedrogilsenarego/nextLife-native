import { View } from "react-native";
import { useSelectedTransactions } from "../TransactionContext";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";

import Button from "@/components/button/ButtonComponent";
import { useMutation } from "@tanstack/react-query";
import { deleteExpense } from "@/actions/expensesActions";
import { deleteIncome } from "@/actions/incomesActions";
import Form from "./Form";

export const TransactionContent = () => {
  const { selectedTransactionId, selectedMode, setSelectedTransactionId } =
    useSelectedTransactions();
  const expenses = useExpenses();
  const incomes = useIncomes();

  const transaction =
    selectedMode === "expense"
      ? expenses?.data.find((expense) => expense.id === selectedTransactionId)
      : incomes?.data.find((incomes) => incomes.id === selectedTransactionId);

  const { mutate: deleteMutation, isPending } = useMutation({
    mutationFn: selectedMode === "expense" ? deleteExpense : deleteIncome,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      selectedMode === "expense" ? expenses.refetch() : incomes.refetch();
      setSelectedTransactionId(null);
    },
    onSettled: async () => {},
  });

  const handleDelete = () => {
    if (transaction?.id) deleteMutation(transaction?.id);
  };

  return (
    <View style={{ paddingTop: 10 }}>
      <Form transaction={transaction} />
      <Button label="Delete" onPress={handleDelete} isLoading={isPending} />
    </View>
  );
};
