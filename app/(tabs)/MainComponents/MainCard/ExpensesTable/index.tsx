import { FlatList } from "react-native-gesture-handler";
import Item from "./Item";
import useExpenses from "@/hooks/useExpenses";
import { useMutation } from "@tanstack/react-query";
import { deleteExpenses } from "@/actions/expensesActions";
import { useState } from "react";
import { View, Text, Touchable, TouchableOpacity } from "react-native";
import Button from "@/components/button/ButtonComponent";
import { useTheme } from "@/providers/ThemeContext";

const ExpensesTable = () => {
  const expenses = useExpenses();

  const [listDelete, setListDelete] = useState<string[]>([]);

  const { mutate: deleteExpensesMutation, isPending } = useMutation({
    mutationFn: deleteExpenses,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
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

  return (
    <View>
      {listDelete.length > 0 && (
        <Button
          onPress={() => deleteExpensesMutation(listDelete)}
          label="Confirm Delete"
          style={{ backgroundColor: "#ffffff66" }}
          isLoading={isPending}
        />
      )}
      <FlatList
        data={expenses.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item
            expense={item}
            handleDelete={handleAddToDelete}
            handleRemoveDelete={handleRemoveToDelete}
          />
        )}
      />
    </View>
  );
};

export default ExpensesTable;
