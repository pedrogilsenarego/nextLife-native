import { View, Text, Pressable, ScrollView } from "react-native";

import React from "react";

import PieChartMain from "../MainCard/PieChartMain/PieChartMain";

import { Card } from "@/components/Atoms/Card";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import LoaderSpinner from "@/components/Atoms/LoaderSpinner";
import { Colors, useTheme } from "@/providers/ThemeContext";

const SecondaryCard = ({
  setSelectedDate,
}: {
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const expenses = useExpenses();
  const incomes = useIncomes();
  const { theme } = useTheme();
  return (
    <Card>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 10,
          borderRadius: 8,
          paddingTop: 16,
          position: "relative",
          height: "100%",
        }}
      >
        <Pressable>
          <View>
            {expenses.isLoading || incomes.isLoading ? (
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 233,
                  width: "100%",
                }}
              >
                <LoaderSpinner
                  color={theme === "light" ? Colors.black : Colors.white}
                />
              </View>
            ) : (
              <PieChartMain setSelectedDate={setSelectedDate} />
            )}
          </View>
        </Pressable>
      </ScrollView>
    </Card>
  );
};

export default SecondaryCard;
