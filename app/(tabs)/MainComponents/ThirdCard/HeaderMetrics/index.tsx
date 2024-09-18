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
        <Text style={{ fontSize: 26 }}>€</Text>
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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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

        <LineChart
          width={100}
          height={50}
          color={mainColor}
          data={[
            { label: "Jan", value: 10 },
            { label: "Feb", value: 15 },
            { label: "Mar", value: 8 },
            { label: "Apr", value: 12 },
          ]}
        />
      </View>
    </View>
  );
};
