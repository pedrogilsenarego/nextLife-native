import { useTheme } from "@/providers/ThemeContext";
import { Expense } from "@/types/expensesTypes";
import { FontAwesome6 } from "@expo/vector-icons";
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
          //backgroundColor: "red",
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
          //borderWidth: 1,
          //borderColor: "#ffffff66",
          //backgroundColor: mainColor,
          paddingVertical: 6,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ rowGap: 3 }}>
          <Text
            style={{
              color: "white",
              fontSize: 14,
              textTransform: "capitalize",
            }}
          >
            {expense.category}
          </Text>
          <FontAwesome6
            name="turn-down"
            color="orangered"
            style={{ opacity: 0.8, marginLeft: 5 }}
          />
        </View>
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
