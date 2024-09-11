import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { View, Text, Pressable } from "react-native";
import { StateSelecter } from "@/app/(tabs)/MainComponents/Header/StateSelecter";
import { SharedValue } from "react-native-reanimated";
import { FiltersButton } from "./FiltersButton";

type Props = {
  handleMoveCarousel: (index: number) => void;
  index: SharedValue<number>;
};

export const CardFooter: React.FC<Props> = ({ handleMoveCarousel, index }) => {
  const expenses = useExpenses();
  const incomes = useIncomes();
  const { theme } = useTheme();

  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 14,
          alignItems: "center",
          paddingVertical: 8,
        }}
      >
        <View style={{ width: "30%" }}>
          <StateSelecter
            handleMoveCarousel={handleMoveCarousel}
            index={index}
          />
        </View>
        <View
          style={{
            width: "40%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: theme === "dark" ? Colors.lightGray : Colors.gray,
              fontSize: 10,
              lineHeight: 12,
            }}
          >
            {expenses?.data?.length} expenses
          </Text>
          <Text
            style={{
              color: theme === "dark" ? Colors.lightGray : Colors.gray,
              fontSize: 10,
              lineHeight: 12,
            }}
          >
            {incomes?.data?.length} incomes
          </Text>
        </View>
        <View
          style={{
            width: "30%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <FiltersButton />
        </View>
      </View>
    </>
  );
};
