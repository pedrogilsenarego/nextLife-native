import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import { Colors, useTheme } from "@/providers/ThemeContext";

import { View, Text } from "react-native";

type Props = {};

export const CardFooter: React.FC<Props> = () => {
  const expenses = useExpenses();
  const incomes = useIncomes();
  const { theme } = useTheme();
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        borderTopWidth: 0.5,
        borderTopColor: theme === "dark" ? Colors.lightGray : Colors.gray,
      }}
    >
      <Text
        style={{
          color: theme === "dark" ? Colors.lightGray : Colors.gray,
          fontSize: 10,
        }}
      >
        Expenses:{expenses?.data?.length} Incomes:{incomes?.data?.length}
      </Text>
    </View>
  );
};
