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
  selectedDate: string;
  setSelectedStatus: (selectedStatus: "expenses" | "incomes" | "both") => void;
};

const ExpensesTable = ({
  selectedStatus,
  setSelectedStatus,
  selectedDate,
}: Props) => {
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
        return (
          expenses.data?.map((expense) => ({
            ...expense,
            type: "expense",
          })) || []
        );
      case "incomes":
        return (
          incomes.data?.map((income) => ({
            ...income,
            type: "income",
          })) || []
        );
      case "both":
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
      default:
        return [];
    }
  };

  const dataToShow =
    selectedDate !== "Total"
      ? listData().filter((item) => {
          const date = new Date(item.created_at);
          const day = String(date.getDate()).padStart(2, "0");
          return day === selectedDate;
        })
      : listData();

  return (
    <View
      style={{
        backgroundColor: "#ffffff1A",
        borderTopWidth: 1,
        paddingTop: 4,
        borderTopColor: `${contrastColor}66`,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },

        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <FlatList
        data={dataToShow}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item
            expense={item}
            handleDelete={handleAddToDelete}
            handleRemoveDelete={handleRemoveToDelete}
          />
        )}
      />
      {/* {listDelete.length > 1 && selectedStatus === "expenses" && (
        <Button
          buttonStyle={{ backgroundColor: "red" }}
          onPress={() => deleteExpensesMutation(listDelete)}
          label="Delete Multiple"
          style={{ position: "absolute", bottom: "0%" }}
          isLoading={isPending}
        />
      )} */}
    </View>
  );
};

export default ExpensesTable;
