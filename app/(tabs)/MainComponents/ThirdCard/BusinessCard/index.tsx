import { Container } from "@/components/Atoms/Container";
import { IconCard } from "@/components/Atoms/IconCard";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import { useTheme } from "@/providers/ThemeContext";
import { Business } from "@/types/businessTypes";
import { getStatusColor } from "@/utils/business";
import { View, Text, Pressable } from "react-native";
import { useSelectedBusiness } from "../BusinessContext";

type Props = {
  businessData: { business: Business; balance: number };
};

export const BusinessCard: React.FC<Props> = ({ businessData }) => {
  const { theme } = useTheme();
  const { setSelectedBusiness } = useSelectedBusiness();
  const businessLabel = defaultBusiness.find(
    (item) => item.value === businessData.business.type
  )?.label;

  const businessIcon = businessData.business?.iconType || 0;

  return (
    <Pressable onPress={() => setSelectedBusiness(businessData.business.id)}>
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
