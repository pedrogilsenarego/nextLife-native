import useBusinesses from "@/hooks/useBusinesses";
import useDeposits from "@/hooks/useDeposits";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { formatAmount } from "@/utils/money";
import { BlurView } from "expo-blur";
import { View, Text } from "react-native";

export const HeaderMetrics = () => {
  const businesses = useBusinesses();
  const { mainColor } = useTheme();
  const deposits = useDeposits();
  const totalDepositsAmount = deposits?.data?.reduce((acc, deposit) => {
    return acc + (deposit.amount || 0);
  }, 0);
  const totalPatrimony = totalDepositsAmount || 0;
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
        }}
      >
        {totalPatrimony.toFixed(1)}
        <Text style={{ fontSize: 26 }}> €</Text>
      </Text>
      <View
        style={{
          borderRadius: 20,
          paddingVertical: 2,
          paddingHorizontal: 10,
          backgroundColor: `${mainColor}66`,
        }}
      >
        <Text style={{ color: Colors.white }}>Metrics</Text>
      </View>
    </View>
  );
};
