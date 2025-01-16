import { Card } from "@/components/Atoms/Card";

import useBusinesses from "@/hooks/useBusinesses";
import { Colors, useTheme } from "@/providers/ThemeContext";
import {
  View,
  Pressable,
  ScrollView,
  Text,
  ImageBackground,
} from "react-native";
import { BusinessCard } from "./BusinessCard";
import { ModalBusinessContent } from "./ModalBusinessContent";
import { AddBusiness } from "./AddBusiness";

import { HorizontalBarChartBusiness } from "./HorizontalBarBusiness";
import useMetrics from "@/hooks/useMetrics";

import { DividerCTA } from "./DividerCTA";

import { useApp } from "@/providers/AppProvider";
import { SelectedDepositProvider } from "./DepositsContext";
import { DepositsScroller } from "./DepositsScroller";
import { HeaderMetrics } from "./HeaderMetrics";
import React, { useMemo } from "react";
import { formatAmount } from "@/utils/money";

const ThirdCard = () => {
  const businesses = useBusinesses();
  const { theme } = useTheme();

  const {
    getExpensesPerBusiness,
    getIncomesPerBusiness,
    totalExpenses,
    totalIncomes,
  } = useMetrics();

  const balance = useMemo(() => {
    return (totalIncomes() - totalExpenses()).toFixed(0);
  }, [totalIncomes, totalExpenses]);

  const { businessFilter } = useApp();
  const businessData =
    businesses?.data?.map((business) => {
      const totalExpenses = getExpensesPerBusiness(business.id);
      const totalIncomes = getIncomesPerBusiness(business.id);
      const balance = totalIncomes - totalExpenses;
      return { business, balance };
    }) || [];

  return (
    <Card footer paperStyles={{ paddingTop: 0 }}>
      <ImageBackground
        imageStyle={{
          opacity: theme === "light" ? 0.9 : 0,
          borderWidth: 3,
          borderColor: "white",
        }}
        source={require("../../../../assets/images/pattern.png")}
      >
        <View style={{ height: "100%" }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            style={{
              borderRadius: 12,

              marginTop: 10,
              position: "relative",
              height: "100%",
            }}
          >
            <Pressable>
              <View
                style={{
                  width: "100%",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",

                    alignItems: "center",

                    justifyContent: "center",
                    paddingTop: 10,
                  }}
                >
                  <HeaderMetrics />
                </View>
                <View
                  style={{
                    marginBottom: 60,
                    marginTop: 30,
                    paddingHorizontal: 14,
                  }}
                >
                  <SelectedDepositProvider>
                    <DepositsScroller />
                  </SelectedDepositProvider>
                </View>

                <View style={{ zIndex: 1000 }}>
                  <DividerCTA label={"Business"} />
                </View>
                <View
                  style={{
                    backgroundColor: Colors.pearlWhite,
                    paddingBottom: 30,
                  }}
                >
                  {(businesses.data?.length || 0) < 1 &&
                  !businesses.isLoading ? (
                    <View
                      style={{
                        paddingHorizontal: 20,
                        flex: 1,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "gray",
                          marginTop: 20,

                          paddingTop: 10,
                          lineHeight: 20,
                        }}
                      >
                        Start by adding a new{" "}
                        <Text style={{ color: Colors.black }}>Business</Text>,
                        this will be used to distinguish between different areas
                        of where your{" "}
                        <Text style={{ color: Colors.black }}>Finances</Text> on
                        your life.
                      </Text>
                      <Text
                        style={{
                          textAlign: "center",
                          color: "gray",
                          paddingTop: 10,
                          paddingBottom: 20,

                          lineHeight: 20,
                        }}
                      >
                        {" "}
                        For example you can yave your job, your freelance and a
                        propriety to be your portfolio of businesses.
                      </Text>

                      <AddBusiness />
                    </View>
                  ) : (
                    <>
                      <View
                        style={{
                          marginTop: 30,
                          paddingHorizontal: 14,
                          display: "flex",
                          flexDirection: "column",
                          rowGap: 16,
                        }}
                      >
                        <View style={{ marginLeft: 26 }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: "400",
                              color: "gray",
                            }}
                          >
                            Profit
                          </Text>
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
                            {formatAmount(balance)}
                            <Text style={{ fontSize: 20, color: Colors.black }}>
                              €
                            </Text>
                          </Text>
                        </View>
                        <HorizontalBarChartBusiness
                          businessData={businessData}
                        />
                      </View>
                      <View
                        style={{
                          rowGap: 8,
                          marginTop: 40,
                          marginBottom: 40,
                          paddingHorizontal: 14,
                        }}
                      >
                        {businessData?.map((businessData) => {
                          return businessFilter.includes(
                            businessData.business.id
                          ) ? null : (
                            <BusinessCard
                              key={businessData.business.id}
                              businessData={businessData}
                            />
                          );
                        })}

                        {(businesses.data?.length || 0) < 5 && <AddBusiness />}
                      </View>
                    </>
                  )}
                </View>
              </View>
              <View>
                <DividerCTA label={"Zyr-o"} />
              </View>
              <View
                style={{
                  marginTop: 40,
                  marginBottom: 40,
                  paddingHorizontal: 20,
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "gray",
                    marginTop: 20,

                    paddingTop: 10,
                    lineHeight: 20,
                  }}
                >
                  The Application has been developed to improve the overall
                  finances{" "}
                  <Text style={{ color: Colors.black }}>knowledge</Text> and{" "}
                  <Text style={{ color: Colors.black }}>awereness</Text> of
                  people.
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: "gray",
                    paddingTop: 10,
                    paddingBottom: 20,

                    lineHeight: 20,
                  }}
                >
                  If you need contact pls send an email to
                  pedrogilsenarego@gmail.com
                </Text>
              </View>
            </Pressable>
          </ScrollView>
        </View>
      </ImageBackground>
      <ModalBusinessContent businessData={businessData} />
    </Card>
  );
};

export default ThirdCard;
