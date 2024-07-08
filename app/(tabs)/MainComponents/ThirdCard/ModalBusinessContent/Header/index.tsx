import { defaultBusiness } from "@/constants/defaultBusinesses";
import { useTheme } from "@/providers/ThemeContext";
import { Business } from "@/types/businessTypes";
import { View, Text, Pressable, FlatList } from "react-native";
import { IconSelector } from "./IconSelector";

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
    </>
  );
};
