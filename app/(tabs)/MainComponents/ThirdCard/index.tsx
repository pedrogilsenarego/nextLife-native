import { Card } from "@/components/Atoms/Card";
import LoaderSpinner from "@/components/Atoms/LoaderSpinner";
import useBusinesses from "@/hooks/useBusinesses";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { View, Pressable, ScrollView, Text } from "react-native";
import { BusinessCard } from "./BusinessCard";
import BottomPopup from "@/components/BottomPopup";
import { useEffect, useState } from "react";
import { ModalBusinessContent } from "./ModalBusinessContent";
import { AddBusiness } from "./AddBusiness";

import { HorizontalBarChartBusiness } from "./HorizontalBarBusiness";
import useMetrics from "@/hooks/useMetrics";
import { useSelectedBusiness } from "./BusinessContext";
import useDeposits from "@/hooks/useDeposits";
import { AddDeposit } from "./AddDeposit";
import { DepositsScroller } from "./DepositsScroller";
import { Divider } from "@/components/Atoms/Divider";
import { HeaderMetrics } from "./HeaderMetrics";
import { DividerCTA } from "./DividerCTA";

const ThirdCard = () => {
  const businesses = useBusinesses();
  const deposits = useDeposits();
  const { theme } = useTheme();
  const { setSelectedBusiness, selectedBusiness } = useSelectedBusiness();

  const { getExpensesPerBusiness, getIncomesPerBusiness } = useMetrics();
  const businessData =
    businesses?.data?.map((business) => {
      const totalExpenses = getExpensesPerBusiness(business.id);
      const totalIncomes = getIncomesPerBusiness(business.id);
      const balance = totalIncomes - totalExpenses;
      return { business, balance };
    }) || [];

  return (
    <Card footer>
      {businesses.isLoading ? (
        <LoaderSpinner />
      ) : (
        <>
          {(businesses.data?.length || 0) < 1 ? (
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
                <Text style={{ fontWeight: 800 }}>Business</Text>, this will be
                used to distinguish between different areas of where your{" "}
                <Text style={{ fontWeight: 800 }}>Finances</Text> on your life.
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
              <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                style={{
                  marginHorizontal: 10,
                  borderRadius: 8,

                  position: "relative",
                  height: "100%",
                }}
              >
                {businesses.isLoading ? (
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 233,
                      width: "100%",
                    }}
                  >
                    <LoaderSpinner
                      color={theme === "light" ? Colors.black : Colors.white}
                    />
                  </View>
                ) : (
                  <Pressable>
                    <Divider />
                    <View
                      style={{
                        width: "100%",
                        paddingHorizontal: 4,
                        marginTop: 16,
                        rowGap: 6,
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",

                          alignItems: "center",
                          paddingHorizontal: 2,
                          paddingTop: 140,
                          justifyContent: "center",

                          height: 250,
                        }}
                      >
                        <HeaderMetrics />
                      </View>
                      <View>
                        <DepositsScroller />
                      </View>
                      <View>
                        <DividerCTA />
                      </View>
                      <View style={{ marginTop: 50 }}>
                        <HorizontalBarChartBusiness
                          businessData={businessData}
                        />
                      </View>
                      {businessData?.map((businessData) => {
                        return <BusinessCard businessData={businessData} />;
                      })}

                      {(businesses.data?.length || 0) < 5 && <AddBusiness />}
                    </View>
                  </Pressable>
                )}
              </ScrollView>
              <BottomPopup
                fullHeight
                closeIcon
                openModal={!!selectedBusiness}
                onClose={() => setSelectedBusiness(null)}
              >
                <ModalBusinessContent />
              </BottomPopup>
            </>
          )}
        </>
      )}
    </Card>
  );
};

export default ThirdCard;
