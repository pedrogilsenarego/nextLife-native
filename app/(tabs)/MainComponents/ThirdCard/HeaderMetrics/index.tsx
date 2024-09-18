import LineChart from "@/components/Charts/LineChart";
import useDeposits from "@/hooks/useDeposits";
import useReports from "@/hooks/useReports";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { View, Text } from "react-native";

export const HeaderMetrics = () => {
  const { mainColor } = useTheme();
  const reports = useReports();
  console.log("reports", reports.data);
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
      }}
    >
      <Text
        style={{
          fontSize: 55,
          fontWeight: "700",
          color: mainColor,
        }}
      >
        {totalPatrimony}
        <Text style={{ fontSize: 26 }}>€</Text>
      </Text>

      <Text
        style={{
          fontSize: 18,
          marginTop: -9,
          fontWeight: "500",
          color: "gray",
        }}
      >
        Portefolio
      </Text>
      <View style={{ marginTop: 7 }}>
        <LineChart
          width={80}
          height={10}
          showAverage
          gradient
          color={mainColor}
          data={[
            { label: "Jan", value: 10 },
            { label: "Feb", value: 12 },
            { label: "Mar", value: 9 },
            { label: "Apr", value: 12 },
          ]}
        />
      </View>
    </View>
  );
};
