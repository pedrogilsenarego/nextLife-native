import BottomPopup from "@/components/BottomPopup";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import { dateRangeLabel } from "@/mappers/dateRange";
import { useApp } from "@/providers/AppProvider";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import { View, Text, Pressable } from "react-native";
import { FilterModal } from "./FilterModal";

type Props = {};

export const CardFooter: React.FC<Props> = () => {
  const expenses = useExpenses();
  const incomes = useIncomes();
  const { theme } = useTheme();
  const { dateRange } = useApp();
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          alignItems: "center",
          paddingVertical: 10,
          borderTopWidth: 0.5,
          borderTopColor: theme === "dark" ? "transparent" : Colors.gray,
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
            onPress={() => setOpenFilters(true)}
            style={{
              paddingVertical: 2,
              paddingHorizontal: 10,
              borderRadius: 40,
              backgroundColor:
                theme === "dark" ? "#ffffff0F" : Colors.lightGray,
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              columnGap: 10,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                color: theme === "dark" ? Colors.lightGray : "black",
              }}
            >
              {dateRangeLabel(dateRange)}
            </Text>
            <Ionicons
              name="filter-circle-outline"
              size={20}
              color={theme === "dark" ? Colors.lightGray : "black"}
            />
          </Pressable>
        </View>
      </View>
      <BottomPopup
        fullHeight
        closeIcon
        openModal={openFilters}
        onClose={() => setOpenFilters(false)}
      >
        <FilterModal />
      </BottomPopup>
    </>
  );
};
