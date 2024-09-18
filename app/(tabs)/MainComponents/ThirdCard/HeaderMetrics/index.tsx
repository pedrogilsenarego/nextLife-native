import { Container } from "@/components/Atoms/Container";
import LineChart from "@/components/Charts/LineChart";
import useDeposits from "@/hooks/useDeposits";
import useReports from "@/hooks/useReports";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { View, Text, Dimensions } from "react-native";

export const HeaderMetrics = () => {
  const { mainColor } = useTheme();
  const reports = useReports();
  const deposits = useDeposits();
  const totalDepositsAmount = deposits?.data?.reduce((acc, deposit) => {
    return acc + (deposit.amount || 0);
  }, 0);
  const totalPatrimony = totalDepositsAmount?.toFixed(0) || "0";

  return (
    <View style={{ paddingHorizontal: 14, width: "100%" }}>
      <Container
        containerStyles={{
          width: "100%",
          paddingHorizontal: 20,
          paddingVertical: 20,

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 16,

                fontWeight: "400",
                color: "gray",
              }}
            >
              Portefolio
            </Text>
            <Text
              style={{
                fontSize: 35,
                letterSpacing: 0,
                marginTop: -4,
                marginLeft: -2,
                fontWeight: "600",
                color: Colors.black,
              }}
            >
              {totalPatrimony}
              <Text style={{ fontSize: 20, color: Colors.black }}>€</Text>
            </Text>
          </View>
          <View>
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
        </View>

        <View style={{ marginTop: 15 }}>
          <LineChart
            width={Dimensions.get("screen").width - 84}
            height={150}
            curveType="cubic"
            color={mainColor}
            data={[
              { label: "Jan", value: 10 },
              { label: "Feb", value: 12 },
              { label: "Mar", value: 5 },
              { label: "Apr", value: 9 },
              { label: "Jun", value: 12 },
              { label: "Jul", value: 10 },
            ]}
          />
        </View>
      </Container>
    </View>
  );
};
