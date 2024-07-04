import { Container } from "@/components/Atoms/Container";
import { IconCard } from "@/components/Atoms/IconCard";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import { useBusinessIcons } from "@/constants/useBusinessIcons";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { Business } from "@/types/businessTypes";
import { getStatusColor } from "@/utils/business";
import { View, Text, Pressable } from "react-native";

type Props = {
  businessData: { business: Business; balance: number };
  onPress: () => void;
};

export const BusinessCard: React.FC<Props> = ({ businessData, onPress }) => {
  const { theme } = useTheme();

  const businessLabel = defaultBusiness.find(
    (item) => item.value === businessData.business.type
  )?.label;
  const businessIcons = useBusinessIcons({ size: 30 });
  const businessIcon = businessData.business?.iconType || 0;

  return (
    <Pressable onPress={onPress}>
      <Container
        status={getStatusColor(businessData.balance)}
        key={businessData.business.id}
        containerStyles={{
          flexDirection: "row",
          alignItems: "stretch",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: 5,
            padding: 4,
          }}
        >
          <Text
            style={{
              textTransform: "capitalize",
              fontWeight: "bold",
              fontSize: 16,
              color: theme === "light" ? "black" : "white",
            }}
          >
            {businessData.business.businessName}
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
            rowGap: 5,
          }}
        >
          <IconCard iconId={businessIcon} size={30} />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: theme === "light" ? "black" : "white",
            }}
          >
            {businessData.balance.toFixed(0)} €
          </Text>
        </View>
      </Container>
    </Pressable>
  );
};
