import { Card } from "@/components/Atoms/Card";
import LoaderSpinner from "@/components/Atoms/LoaderSpinner";
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
import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";

import { ModalBusinessContent } from "./ModalBusinessContent";
import { AddBusiness } from "./AddBusiness";

import { HorizontalBarChartBusiness } from "./HorizontalBarBusiness";
import useMetrics from "@/hooks/useMetrics";

import { DividerCTA } from "./DividerCTA";

import { useApp } from "@/providers/AppProvider";
import { SelectedDepositProvider } from "./DepositsContext";
import { DepositsScroller } from "./DepositsScroller";
import { HeaderMetrics } from "./HeaderMetrics";

const ThirdCard = () => {
  const businesses = useBusinesses();
  const { theme } = useTheme();

  const { getExpensesPerBusiness, getIncomesPerBusiness } = useMetrics();

  const { businessFilter } = useApp();
  const businessData =
    businesses?.data?.map((business) => {
      const totalExpenses = getExpensesPerBusiness(business.id);
      const totalIncomes = getIncomesPerBusiness(business.id);
      const balance = totalIncomes - totalExpenses;
      return { business, balance };
    }) || [];

  return (
    <Card footer paperStyles={{ paddingTop: 6 }}>
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
                <Text style={{ color: Colors.black }}>Business</Text>, this will
                be used to distinguish between different areas of where your{" "}
                <Text style={{ color: Colors.black }}>Finances</Text> on your
                life.
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
                  borderRadius: 12,

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
                      }}
                    >
                      <ImageBackground
                        imageStyle={{
                          opacity: theme === "light" ? 0.9 : 0,

                          borderWidth: 3,
                          borderColor: "white",
                          height: "100%",
                        }}
                        source={require("../../../../assets/images/pattern.png")}
                        style={{}}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",

                            alignItems: "center",

                            justifyContent: "center",
                            paddingTop: 150,
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
                      </ImageBackground>
                      <View>
                        <DividerCTA label={"Business"} />
                      </View>
                      <View style={{ marginTop: 60, paddingHorizontal: 14 }}>
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
                            <BusinessCard businessData={businessData} />
                          );
                        })}

                        {(businesses.data?.length || 0) < 5 && <AddBusiness />}
                      </View>
                    </View>
                    <View style={{ marginTop: 40 }}>
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
                        The Application has been developed to improve the
                        overall finances{" "}
                        <Text style={{ color: Colors.black }}>knowledge</Text>{" "}
                        and{" "}
                        <Text style={{ color: Colors.black }}>awereness</Text>{" "}
                        of people.
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
                )}
              </ScrollView>

              <ModalBusinessContent businessData={businessData} />
            </>
          )}
        </>
      )}
    </Card>
  );
};

export default ThirdCard;
