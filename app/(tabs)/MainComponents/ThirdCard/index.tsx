import { Card } from "@/components/Atoms/Card";
import LoaderSpinner from "@/components/Atoms/LoaderSpinner";
import useBusinesses from "@/hooks/useBusinesses";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { View, Pressable, ScrollView, Text } from "react-native";
import { BusinessCard } from "./BusinessCard";
import BottomPopup from "@/components/BottomPopup";
import { useState } from "react";
import { ModalBusinessContent } from "./ModalBusinessContent";
import { AddBusiness } from "./AddBusiness";

import { HorizontalBarChartBusiness } from "./HorizontalBarBusiness";
import useMetrics from "@/hooks/useMetrics";

const ThirdCard = () => {
  const businesses = useBusinesses();
  const { theme } = useTheme();
  const [businessSelected, setBusinessSelected] = useState<number | null>(null);
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
      {(businesses.data?.length || 0) < 1 ? (
        <View
          style={{ paddingHorizontal: 20, flex: 1, justifyContent: "center" }}
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
            <Text style={{ fontWeight: 800 }}>Business</Text>, this will be used
            to distinguish between different areas of where your{" "}
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
            For example you can yave your job, your freelance and a propriety to
            be your portfolio of businesses.
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
                <View
                  style={{
                    width: "100%",
                    paddingHorizontal: 4,
                    marginTop: 20,
                    rowGap: 6,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      columnGap: 5,
                      alignItems: "center",
                      paddingHorizontal: 2,
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: 1,
                        paddingLeft: 5,
                        width: "40%",
                      }}
                    >
                      <Text style={{ fontSize: 16, fontWeight: "600" }}>
                        Patrimony: 323k
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
                    <View style={{ width: "60%" }}>
                      <HorizontalBarChartBusiness businessData={businessData} />
                    </View>
                  </View>
                  {businessData?.map((businessData, index) => {
                    return (
                      <BusinessCard
                        businessData={businessData}
                        onPress={() => {
                          setBusinessSelected(index);
                        }}
                      />
                    );
                  })}

                  {(businesses.data?.length || 0) < 5 && <AddBusiness />}
                </View>
              </Pressable>
            )}
          </ScrollView>
          <BottomPopup
            fullHeight
            closeIcon
            openModal={businessSelected !== null}
            onClose={() => setBusinessSelected(null)}
          >
            {businessSelected !== null && businesses?.data && (
              <ModalBusinessContent
                business={businesses?.data?.[businessSelected]}
                setBusinessSelected={setBusinessSelected}
              />
            )}
          </BottomPopup>
        </>
      )}
    </Card>
  );
};

export default ThirdCard;
