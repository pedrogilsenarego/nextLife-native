import { FlatList } from "react-native-gesture-handler";
import Item from "./Item";
import useExpenses from "@/hooks/useExpenses";
import { useMutation } from "@tanstack/react-query";
import { deleteExpenses } from "@/actions/expensesActions";
import { useState } from "react";
import { View } from "react-native";
import Button from "@/components/button/ButtonComponent";
import { useTheme } from "@/providers/ThemeContext";
import useIncomes from "@/hooks/useIncomes";

type Props = {
  selectedStatus: "expenses" | "incomes" | "both";
  setSelectedStatus: (selectedStatus: "expenses" | "incomes" | "both") => void;
};

const ExpensesTable = ({ selectedStatus, setSelectedStatus }: Props) => {
  const expenses = useExpenses();
  const incomes = useIncomes();
  const { contrastColor } = useTheme();
  const [listDelete, setListDelete] = useState<string[]>([]);

  const { mutate: deleteExpensesMutation, isPending } = useMutation({
    mutationFn: deleteExpenses,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      setListDelete([]);
      expenses.refetch();
    },
    onSettled: async () => {},
  });

  const handleAddToDelete = (id: string) => {
    setListDelete((listDelete) => [...listDelete, id]);
  };

  const handleRemoveToDelete = (id: string) => {
    setListDelete((listDelete) => listDelete.filter((item) => item !== id));
  };

  const listData = () => {
    switch (selectedStatus) {
      case "expenses":
        return expenses.data!;
      case "incomes":
        return incomes.data!;
      case "both":
        return [...incomes.data!, ...expenses.data!];
      default:
        return [];
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#ffffff1A",
        borderTopWidth: 1,
        paddingTop: 4,
        borderTopColor: `${contrastColor}66`,
      }}
    >
      <FlatList
        data={listData()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item
            expense={item}
            handleDelete={handleAddToDelete}
            handleRemoveDelete={handleRemoveToDelete}
          />
        )}
      />
      {listDelete.length > 0 && (
        <Button
          buttonStyle={{ backgroundColor: "red" }}
          onPress={() => deleteExpensesMutation(listDelete)}
          label="Confirm Delete"
          style={{ position: "absolute", top: 0 }}
          isLoading={isPending}
        />
      )}
    </View>
  );
};

export default ExpensesTable;
