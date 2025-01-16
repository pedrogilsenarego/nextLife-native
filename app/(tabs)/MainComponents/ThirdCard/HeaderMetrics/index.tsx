import { Container } from "@/components/Atoms/Container";
import Skeleton from "@/components/Atoms/Skeleton";
import LineChart from "@/components/Charts/LineChart";
import { usePortefolio } from "@/hooks/usePortefolio";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { formatAmount } from "@/utils/money";
import React from "react";
import { View, Dimensions, Text } from "react-native";

export const HeaderMetrics = () => {
  const { mainColor } = useTheme();
  const { portefolioInTime, totalCurrentPatrimony, isLoadingPortefolio } =
    usePortefolio();

  const portefolioTime = portefolioInTime();

  const deltaPortefolio =
    portefolioTime[portefolioTime.length - 1]?.value -
    portefolioTime[portefolioTime.length - 2]?.value;

  const deltaPortefolioPercentage =
    ((portefolioTime[portefolioTime.length - 1]?.value -
      portefolioTime[portefolioTime.length - 2]?.value) /
      portefolioTime[portefolioTime.length - 2]?.value) *
    100;

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
            {isLoadingPortefolio ? (
              <Skeleton height={16} style={{ marginTop: 1.6 }} width={60} />
            ) : (
              <Text
                style={{
                  fontSize: 16,

                  fontWeight: "400",
                  color: "gray",
                }}
              >
                Portefolio
              </Text>
            )}
            {isLoadingPortefolio ? (
              <Skeleton height={35} style={{ marginTop: 3.5 }} />
            ) : (
              <Text
                style={{
                  fontSize: 32,
                  letterSpacing: 0,

                  marginTop: -4,
                  marginBottom: -5,
                  marginLeft: -2,
                  fontWeight: "600",
                  color: Colors.black,
                }}
              >
                {formatAmount(totalCurrentPatrimony.toFixed(1))}
                <Text style={{ fontSize: 20, color: Colors.black }}>€</Text>
              </Text>
            )}
          </View>
          <View style={{ justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              {!isLoadingPortefolio ? (
                <View
                  style={{
                    marginTop: 10,
                    borderRadius: 20,
                    paddingVertical: 2,
                    paddingHorizontal: 10,
                    backgroundColor: Colors.lightGray,
                  }}
                >
                  <Text style={{ color: Colors.gray, fontSize: 12 }}>
                    Metrics
                  </Text>
                </View>
              ) : (
                <Skeleton
                  height={16}
                  style={{ marginTop: 10 }}
                  borderRadius={20}
                  width={50}
                />
              )}
            </View>
            {isLoadingPortefolio ? (
              <Skeleton height={14} style={{ marginTop: 1.4 }} />
            ) : (
              <>
                {portefolioTime.length > 1 && (
                  <Text
                    style={{ color: "gray", textAlign: "right", fontSize: 14 }}
                  >
                    {deltaPortefolioPercentage.toFixed(1)}% last month
                  </Text>
                )}
              </>
            )}
          </View>
        </View>
        {isLoadingPortefolio ? (
          <View>
            <Skeleton
              height={150}
              style={{ marginTop: 25 }}
              width={Dimensions.get("screen").width - 76}
            />
            <Skeleton
              width={Dimensions.get("screen").width - 76}
              style={{ marginTop: 20 }}
            />
          </View>
        ) : (
          <>
            {portefolioTime.length > 1 && (
              <>
                <View style={{ marginTop: 25 }}>
                  <LineChart
                    width={Dimensions.get("screen").width - 84}
                    height={150}
                    curveType="cubic"
                    color={mainColor}
                    data={portefolioTime}
                  />
                </View>

                <Text
                  style={{
                    color: "gray",
                    textAlign: "left",
                    width: "100%",
                    marginTop: 20,
                  }}
                >
                  This month you{" "}
                  {deltaPortefolio > 0 ? "increased" : "decreased"} your
                  patrimony in{" "}
                  <Text style={{ color: Colors.black }}>
                    {deltaPortefolio > 0 ? "+" : ""} {deltaPortefolio}€
                  </Text>
                  .
                </Text>
              </>
            )}
          </>
        )}
      </Container>
    </View>
  );
};
