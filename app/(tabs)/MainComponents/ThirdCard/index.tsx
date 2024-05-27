import { Card } from "@/components/Atoms/Card";
import { Container } from "@/components/Atoms/Container";
import LoaderSpinner from "@/components/Atoms/LoaderSpinner";
import useBusinesses from "@/hooks/useBusinesses";
import { Colors, useTheme } from "@/providers/ThemeContext";

import { View, Text, Pressable, ScrollView } from "react-native";

const ThirdCard = () => {
  const businesses = useBusinesses();
  const { theme } = useTheme();
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
                return (
                  <Container
                    key={index}
                    containerStyles={{ flexDirection: "column" }}
                  >
                    <Text
                      style={{
                        textTransform: "capitalize",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      {business.businessName}
                    </Text>
                    <Text
                      style={{
                        textTransform: "capitalize",

                        fontSize: 14,
                      }}
                    >
                      {business.type}
                    </Text>
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
