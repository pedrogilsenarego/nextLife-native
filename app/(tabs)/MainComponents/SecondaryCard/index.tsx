import { View, Text, Pressable, ScrollView } from "react-native";

import React from "react";

import PieChartMain from "../MainCard/PieChartMain/PieChartMain";

import { Card } from "@/components/Atoms/Card";

const SecondaryCard = () => {
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
            <PieChartMain />
          </View>
        </Pressable>
      </ScrollView>
    </Card>
  );
};

export default SecondaryCard;
