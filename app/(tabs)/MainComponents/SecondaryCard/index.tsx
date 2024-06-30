import { View, Text, Pressable, ScrollView } from "react-native";

import React from "react";

import PieChartMain from "../MainCard/PieChartMain/PieChartMain";

import { Card } from "@/components/Atoms/Card";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import LoaderSpinner from "@/components/Atoms/LoaderSpinner";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { CardFooter } from "@/components/Molecules/CardFooter";

const SecondaryCard = () => {
  const expenses = useExpenses();
  const incomes = useIncomes();
  const { theme } = useTheme();
  return (
    <Card footer>
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
        <PieChartMain />
      </ScrollView>
    </Card>
  );
};

export default SecondaryCard;
