import { Card } from "@/components/Atoms/Card";
import LoaderSpinner from "@/components/Atoms/LoaderSpinner";
import useBusinesses from "@/hooks/useBusinesses";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { View, Pressable, ScrollView } from "react-native";
import { BusinessCard } from "./BusinessCard";
import BottomCard from "../BottomCard";
import BottomPopup from "@/components/BottomPopup";
import { useState } from "react";
import { ModalBusinessContent } from "./ModalBusinessContent";
import { useApp } from "@/providers/AppProvider";
import { CardFooter } from "@/components/Molecules/CardFooter";

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
                marginTop: 50,
                rowGap: 6,
              }}
            >
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
