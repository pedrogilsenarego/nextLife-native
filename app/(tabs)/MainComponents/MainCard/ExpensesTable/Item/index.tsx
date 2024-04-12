import { useTheme } from "@/providers/ThemeContext";
import { Expense } from "@/types/expensesTypes";
import moment from "moment";
import { View, Text, Animated, Dimensions } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

type Props = {
  expense: Expense;
  handleDelete: (id: string) => void;
  handleRemoveDelete: (id: string) => void;
};

const Item = ({ expense, handleDelete, handleRemoveDelete }: Props) => {
  const { mainColor } = useTheme();
  const dateFormatter = (date: Date) => {
    return moment(date).format("DD MMM HH:MM");
  };

  const RightAction = (percentage: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: "#ffffff66",
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingHorizontal: 20,
        }}
      >
        <Animated.Text
          style={[{ color: "white", fontSize: 16 }, { transform: [{ scale }] }]}
        >
          Delete
        </Animated.Text>
      </View>
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
          borderColor: "#ffffff66",
          backgroundColor: mainColor,
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 14,
            textTransform: "capitalize",
          }}
        >
          {expense.category}
        </Text>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
            {expense.amount}€
          </Text>
          <Text style={{ color: "white", fontSize: 12 }}>
            {dateFormatter(expense.created_at)}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
};

export default Item;
