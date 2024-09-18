import useDeposits from "@/hooks/useDeposits";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export const HeaderMetrics = () => {
  const { mainColor } = useTheme();

  const deposits = useDeposits();
  const totalDepositsAmount = deposits?.data?.reduce((acc, deposit) => {
    return acc + (deposit.amount || 0);
  }, 0);
  const totalPatrimony = totalDepositsAmount?.toFixed(0) || "0";

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        rowGap: 1,
        paddingLeft: 5,
      }}
    >
      <Text
        style={{
          fontSize: 55,
          fontWeight: "700",
          color: mainColor,
          lineHeight: 55,
        }}
      >
        {totalPatrimony}
        <Text style={{ fontSize: 26 }}> €</Text>
      </Text>
      <Text
        style={{
          marginTop: -6,
          fontSize: 20,
          lineHeight: 20,
          fontWeight: "500",
          color: Colors.black,
        }}
      >
        Available Cash
      </Text>
      <View
        style={{
          marginTop: 10,
          borderRadius: 20,
          paddingVertical: 2,
          paddingHorizontal: 10,
          backgroundColor: Colors.lightGray,
        }}
      >
        <Text style={{ color: Colors.gray }}>Metrics</Text>
      </View>
    </View>
  );
};
