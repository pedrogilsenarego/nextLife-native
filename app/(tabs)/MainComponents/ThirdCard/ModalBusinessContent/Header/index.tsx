import { Container } from "@/components/Atoms/Container";
import { IconCard } from "@/components/Atoms/IconCard";
import BottomPopup from "@/components/BottomPopup";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import { useBusinessIcons } from "@/constants/useBusinessIcons";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { Business } from "@/types/businessTypes";
import { useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { Icon } from "./Icon";

type Props = {
  business: Business;
};

export const Header: React.FC<Props> = ({ business }) => {
  const { theme } = useTheme();

  const businessLabel = defaultBusiness.find(
    (item) => item.value === business.type
  )?.label;

  return (
    <>
      <View
        style={{
          marginTop: 55,
          alignItems: "center",
          width: "100%",
          flexDirection: "row",
          paddingBottom: 10,
          columnGap: 10,
        }}
      >
        <Icon business={business} />
        <View>
          <Text
            style={{
              color: theme === "light" ? "black" : "white",
              textTransform: "capitalize",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            {business.businessName}
          </Text>
          <Text
            style={{
              color: "gray",
              textTransform: "capitalize",
              fontSize: 12,
              fontWeight: "600",
            }}
          >
            {businessLabel}
          </Text>
        </View>
      </View>
    </>
  );
};
