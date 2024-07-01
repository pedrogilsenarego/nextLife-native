import { Card } from "@/components/Atoms/Card";
import LoaderSpinner from "@/components/Atoms/LoaderSpinner";
import useBusinesses from "@/hooks/useBusinesses";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { View, Pressable, ScrollView, Text } from "react-native";
import { BusinessCard } from "./BusinessCard";
import BottomPopup from "@/components/BottomPopup";
import { useState } from "react";
import { ModalBusinessContent } from "./ModalBusinessContent";
import { useApp } from "@/providers/AppProvider";
import { Container } from "@/components/Atoms/Container";
import { AddBusiness } from "./AddBusiness";

const ThirdCard = () => {
  const businesses = useBusinesses();
  const { addBusinessFilter } = useApp();
  const { theme } = useTheme();

  const [businessSelected, setBusinessSelected] = useState<number | null>(null);

  return (
    <Card footer>
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
                style={{ display: "flex", flexDirection: "column", rowGap: 1 }}
              >
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  Patrimony:
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "gray" }}
                >
                  Businesses: {businesses.data?.length || 0}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    marginBottom: 10,
                    color: "gray",
                  }}
                >
                  Properties/Comodities: 1/1
                </Text>
              </View>
              {businesses.data?.map((business, index) => {
                return (
                  <BusinessCard
                    business={business}
                    onPress={() => {
                      setBusinessSelected(index);
                    }}
                  />
                );
              })}
              <AddBusiness />
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
          />
        )}
      </BottomPopup>
    </Card>
  );
};

export default ThirdCard;
