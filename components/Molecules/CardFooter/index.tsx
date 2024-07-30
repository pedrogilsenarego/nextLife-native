import { BottomPopup } from "@/components/BottomPopup";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import { dateRangeLabel } from "@/mappers/dateRange";
import { useApp } from "@/providers/AppProvider";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import { View, Text, Pressable } from "react-native";
import { FiltersModal } from "./FiltersModal";
import { StateSelecter } from "@/app/(tabs)/MainComponents/Header/StateSelecter";
import { SharedValue } from "react-native-reanimated";

type Props = {
  handleMoveCarousel: (index: number) => void;
  index: SharedValue<number>;
};

export const CardFooter: React.FC<Props> = ({ handleMoveCarousel, index }) => {
  const expenses = useExpenses();
  const incomes = useIncomes();
  const { theme, mainColor } = useTheme();
  const { dateRange } = useApp();
  const [openFilters, setOpenFilters] = useState<boolean>(false);
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
          <Pressable
            onPress={() => setOpenFilters(true)}
            style={{
              paddingVertical: 1,
              paddingHorizontal: 10,
              borderRadius: 40,

              backgroundColor: `${mainColor}80`,
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              columnGap: 10,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                color: Colors.white,
              }}
            >
              {dateRangeLabel(dateRange)}
            </Text>
            <Ionicons
              name="filter-circle-outline"
              size={20}
              color={Colors.white}
            />
          </Pressable>
        </View>
      </View>

      <FiltersModal openModal={openFilters} setOpenModal={setOpenFilters} />
    </>
  );
};
