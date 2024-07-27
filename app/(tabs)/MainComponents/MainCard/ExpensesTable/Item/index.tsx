import { useBusinessIcons } from "@/constants/useBusinessIcons";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { FontAwesome6 } from "@expo/vector-icons";
import moment from "moment";
import { View, Text, Pressable } from "react-native";
import { useSelectedTransactions } from "../TransactionContext";

type Props = {
  expense: any;
};

const Item = ({ expense }: Props) => {
  const icons = useBusinessIcons({ size: 30 });

  const { setSelectedTransactionId, setSelectedMode } =
    useSelectedTransactions();
  const { theme } = useTheme();
  const dateFormatter = (date: Date) => {
    return moment(date).format("DD MMM HH:MM");
  };

  // const RightAction = (percentage: any, dragX: any) => {
  //   const scale = dragX.interpolate({
  //     inputRange: [-100, 0],
  //     outputRange: [1, 0],
  //     extrapolate: "clamp",
  //   });

  //   return isPending ? (
  //     <View
  //       style={{ flexDirection: "row", alignItems: "center", height: "100%" }}
  //     >
  //       <LoaderSpinner color={"red"} />
  //     </View>
  //   ) : (
  //     <Pressable
  //       onPress={handleLocalDelete}
  //       style={{
  //         justifyContent: "center",
  //         alignItems: "flex-end",
  //         paddingHorizontal: 12,
  //       }}
  //     >
  //       <Animated.Text
  //         style={[
  //           { color: "orangered", fontSize: 16 },
  //           { transform: [{ scale }] },
  //         ]}
  //       >
  //         Delete
  //       </Animated.Text>
  //     </Pressable>
  //   );
  // };
  const handlePress = () => {
    setSelectedTransactionId(expense.id);
    setSelectedMode(expense.type);
  };
  return (
    <Pressable onPress={handlePress}>
      {/* <Swipeable
        renderRightActions={RightAction}
        onSwipeableOpen={() => handleDelete(expense.id)}
        onSwipeableClose={() => handleRemoveDelete(expense.id)}
      > */}
      <View
        style={{
          borderBottomWidth: theme === "light" ? 1 : 0,
          borderColor: Colors.lightGray,

          paddingVertical: 8,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ rowGap: 3, width: "40%" }}>
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
        <View
          style={{
            opacity: 0.05,
            width: "20%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            overflow: "hidden",
          }}
        >
          {expense?.business?.icon_type &&
            icons[expense?.business?.icon_type].icon}
        </View>
        <View style={{ alignItems: "flex-end", width: "40%" }}>
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
      {/* </Swipeable> */}
    </Pressable>
  );
};

export default Item;
