import { Card } from "@/components/Atoms/Card";
import { Container } from "@/components/Atoms/Container";
import LoaderSpinner from "@/components/Atoms/LoaderSpinner";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import useBusinesses from "@/hooks/useBusinesses";
import useMetrics from "@/hooks/useMetrics";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { AntDesign } from "@expo/vector-icons";

import { View, Text, Pressable, ScrollView } from "react-native";

const ThirdCard = () => {
  const businesses = useBusinesses();
  const { theme, mainColor } = useTheme();
  const { getExpensesPerBusiness, getIncomesPerBusiness } = useMetrics();

  return (
    <Card>
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
                marginTop: 100,
                rowGap: 20,
              }}
            >
              {businesses.data?.map((business, index) => {
                const businessLabel = defaultBusiness.find(
                  (item) => item.value === business.type
                )?.label;
                const totalExpenses = getExpensesPerBusiness(business.id);
                const totalIncomes = getIncomesPerBusiness(business.id);
                return (
                  <Container
                    key={index}
                    containerStyles={{
                      flexDirection: "row",
                      alignItems: "stretch",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          textTransform: "capitalize",
                          fontWeight: "bold",
                          fontSize: 16,
                          color: theme === "light" ? "black" : "white",
                        }}
                      >
                        {business.businessName}
                      </Text>
                      <Text
                        style={{
                          textTransform: "capitalize",
                          color: theme === "light" ? "black" : "white",
                          fontSize: 14,
                        }}
                      >
                        {businessLabel}
                      </Text>
                      <Text
                        style={{
                          textTransform: "capitalize",
                          marginTop: 6,
                          color: "gray",
                          fontSize: 12,
                        }}
                      >
                        Current balance
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                      }}
                    >
                      <AntDesign color={mainColor} size={30} name="gitlab" />
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          color: theme === "light" ? "black" : "white",
                        }}
                      >
                        {(totalIncomes - totalExpenses).toFixed(0)} €
                      </Text>
                    </View>
                  </Container>
                );
              })}
            </View>
          </Pressable>
        )}
      </ScrollView>
    </Card>
  );
};

export default ThirdCard;
