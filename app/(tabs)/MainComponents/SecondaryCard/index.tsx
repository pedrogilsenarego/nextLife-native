import useMetrics from "@/hooks/useMetrics";
import useUser from "@/hooks/useUser";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Colors, useTheme } from "@/providers/ThemeContext";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import PieChartMain from "../MainCard/PieChartMain/PieChartMain";
import { Container } from "@/components/Atoms/Container";
import { ArrayButtons } from "@/components/Molecules/ArrayButtons";
import { Card } from "@/components/Atoms/Card";

const SecondaryCard = () => {
  const currentDate = new Date();
  const monthInLetters = currentDate.toLocaleString("default", {
    month: "long",
  });
  const formattedDate = `${currentDate.getDate()}, ${monthInLetters} ${currentDate.getFullYear()}`;

  const userQuery = useUser();
  const { contrastColor, mainColor, theme } = useTheme();

  const { totalExpenses, totalIncomes } = useMetrics();

  return (
    <Card>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 10,
          borderRadius: 8,
          paddingTop: 10,
          position: "relative",
          height: "100%",
        }}
      >
        <Pressable>
          <View>
            <PieChartMain />
          </View>
        </Pressable>
      </ScrollView>
    </Card>
  );
};

export default SecondaryCard;
