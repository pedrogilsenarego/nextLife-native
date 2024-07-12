import { defaultBusiness } from "@/constants/defaultBusinesses";
import { useTheme } from "@/providers/ThemeContext";
import { Business } from "@/types/businessTypes";
import { View, Text, Pressable } from "react-native";
import { IconSelector } from "./IconSelector";

import { Settings } from "./Settings";
import { Dispatch, SetStateAction } from "react";

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
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          flexDirection: "row",
          paddingBottom: 10,
          columnGap: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            columnGap: 10,
          }}
        >
          <IconSelector business={business} />
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
        <Settings businessId={business.id} />
      </View>
    </>
  );
};
