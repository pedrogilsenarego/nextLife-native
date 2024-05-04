import useMetrics from "@/hooks/useMetrics";
import useUser from "@/hooks/useUser";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Colors, useTheme } from "@/providers/ThemeContext";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import PieChartMain from "../MainCard/PieChartMain/PieChartMain";
import { Container } from "@/components/Atoms/Container";
import { ArrayButtons } from "@/components/Molecules/ArrayButtons";

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
    <View
      style={{
        height: "100%",
        backgroundColor: theme === "light" ? "white" : "transparent",
        borderRadius: 12,

        marginHorizontal: 4,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },

        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingVertical: 18,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 10,
          borderRadius: 8,

          position: "relative",
          height: "100%",
        }}
      >
        <Pressable>
          <View style={{ marginTop: 85 }}>
            <PieChartMain />
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default SecondaryCard;
