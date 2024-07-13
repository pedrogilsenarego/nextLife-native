import useBusinesses from "@/hooks/useBusinesses";
import useDeposits from "@/hooks/useDeposits";
import { formatAmount } from "@/utils/money";
import { View, Text } from "react-native";

export const HeaderMetrics = () => {
  const businesses = useBusinesses();
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
        rowGap: 1,
        paddingLeft: 5,
        width: "40%",
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "600" }}>
        Net:{formatAmount(totalPatrimony.toString())}€
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "500",
          color: "gray",
        }}
      >
        Businesses: {businesses.data?.length || 0}
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "500",

          color: "gray",
        }}
      >
        Properties: 1
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "500",
          marginBottom: 10,
          color: "gray",
        }}
      >
        Veicules: 1
      </Text>
    </View>
  );
};
