import { View, Text } from "react-native";
import { useSelectedTransactions } from "../TransactionContext";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import { Divider } from "@/components/Atoms/Divider";
import { useBusinessIcons } from "@/constants/useBusinessIcons";
import Button from "@/components/button/ButtonComponent";
import { useMutation } from "@tanstack/react-query";
import { deleteExpenses } from "@/actions/expensesActions";
import { deleteIncomes } from "@/actions/incomesActions";

export const TransactionContent = () => {
  const { selectedTransactionId, selectedMode, setSelectedTransactionId } =
    useSelectedTransactions();
  const expenses = useExpenses();
  const incomes = useIncomes();
  const icons = useBusinessIcons({ size: 30 });
  const transaction =
    selectedMode === "expense"
      ? expenses?.data.find((expense) => expense.id === selectedTransactionId)
      : incomes?.data.find((incomes) => incomes.id === selectedTransactionId);

  const { mutate: deleteMutation, isPending } = useMutation({
    mutationFn: selectedMode === "expense" ? deleteExpenses : deleteIncomes,
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
    if (transaction?.id) deleteMutation([transaction?.id]);
  };

  return (
    <View style={{ paddingTop: 10, position: "relative" }}>
      <View
        style={{
          opacity: 0.05,
          position: "absolute",
          top: "50%",

          left: "50%",
        }}
      >
        {transaction?.business?.icon_type &&
          icons[transaction?.business?.icon_type].icon}
      </View>
      <Divider />
      <Text>Amount: {transaction?.amount}</Text>
      <Text>Category: {transaction?.category}</Text>
      <Text>Note: {transaction?.note}</Text>
      <Text>Business: {transaction?.business?.business_name}</Text>
      <Text>Deposit: {transaction?.deposits?.deposit_name}</Text>
      <Button label="Delete" onPress={handleDelete} isLoading={isPending} />
    </View>
  );
};
