import { deleteExpenses } from "@/actions/expensesActions";
import { deleteIncomes } from "@/actions/incomesActions";
import LoaderSpinner from "@/components/Atoms/LoaderSpinner";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { Expense } from "@/types/expensesTypes";
import { FontAwesome6 } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { View, Text, Animated, Dimensions, Pressable } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

type Props = {
  expense: any;
  handleDelete: (id: string) => void;
  handleRemoveDelete: (id: string) => void;
};

const Item = ({ expense, handleDelete, handleRemoveDelete }: Props) => {
  const expenses = useExpenses();
  const incomes = useIncomes();
  const { theme } = useTheme();
  const dateFormatter = (date: Date) => {
    return moment(date).format("DD MMM HH:MM");
  };
  const { mutate: deleteMutation, isPending } = useMutation({
    mutationFn: expense.type === "expense" ? deleteExpenses : deleteIncomes,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      expense.type === "expense" ? expenses.refetch() : incomes.refetch();
    },
    onSettled: async () => {},
  });

  const handleLocalDelete = () => {
    handleRemoveDelete(expense.id);
    deleteMutation([expense.id]);
  };

  const RightAction = (percentage: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return isPending ? (
      <View
        style={{ flexDirection: "row", alignItems: "center", height: "100%" }}
      >
        <LoaderSpinner color={"red"} />
      </View>
    ) : (
      <Pressable
        onPress={handleLocalDelete}
        style={{
          justifyContent: "center",
          alignItems: "flex-end",
          paddingHorizontal: 12,
        }}
      >
        <Animated.Text
          style={[
            { color: "orangered", fontSize: 16 },
            { transform: [{ scale }] },
          ]}
        >
          Delete
        </Animated.Text>
      </Pressable>
    );
  };
  return (
    <Swipeable
      renderRightActions={RightAction}
      onSwipeableOpen={() => handleDelete(expense.id)}
      onSwipeableClose={() => handleRemoveDelete(expense.id)}
    >
      <View
        style={{
          borderWidth: 1,
          borderColor: Colors.lightGray,

          paddingVertical: 8,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ rowGap: 3 }}>
          <Text
            style={{
              color: theme === "light" ? Colors.black : "white",
              fontSize: 16,
              textTransform: "capitalize",
            }}
          >
            {expense.category}
          </Text>
          <FontAwesome6
            name={expense.type === "expense" ? "turn-down" : "turn-up"}
            color={expense.type === "expense" ? "orangered" : "green"}
            style={{ opacity: 0.8, marginLeft: 5 }}
          />
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={{
              color: theme === "light" ? Colors.black : "white",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {expense.amount}€
          </Text>
          <Text
            style={{
              color: theme === "light" ? Colors.black : "white",
              fontSize: 12,
            }}
          >
            {dateFormatter(expense.created_at)}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
};

export default Item;
