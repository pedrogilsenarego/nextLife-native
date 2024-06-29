import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import { dateRangeLabel } from "@/mappers/dateRange";
import { useApp } from "@/providers/AppProvider";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

import { View, Text, Pressable } from "react-native";

type Props = {};

export const CardFooter: React.FC<Props> = () => {
  const expenses = useExpenses();
  const incomes = useIncomes();
  const { theme } = useTheme();
  const { dateRange } = useApp();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        alignItems: "center",
        paddingVertical: 10,
        borderTopWidth: 0.5,
        borderTopColor: theme === "dark" ? Colors.lightGray : Colors.gray,
      }}
    >
      <View style={{ width: "30%" }}></View>
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
        <Pressable
          style={{
            paddingVertical: 2,
            paddingHorizontal: 10,
            borderRadius: 40,
            backgroundColor: Colors.lightGray,
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            columnGap: 10,
          }}
        >
          <Text style={{ fontSize: 10 }}>{dateRangeLabel(dateRange)}</Text>
          <Ionicons name="filter-circle-outline" size={20} color="black" />
        </Pressable>
      </View>
    </View>
  );
};
