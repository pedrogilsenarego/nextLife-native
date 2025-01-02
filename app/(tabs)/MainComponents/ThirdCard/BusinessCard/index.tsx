import { Container } from "@/components/Atoms/Container";
import { IconCard } from "@/components/Atoms/IconCard";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { Business } from "@/types/businessTypes";
import { getStatusColor } from "@/utils/business";
import { View, Text, Pressable } from "react-native";
import { useSelectedBusiness } from "../BusinessContext";
import { useBusinessIcons } from "@/constants/useBusinessIcons";

type Props = {
  businessData: { business: Business; balance: number };
};

export const BusinessCard: React.FC<Props> = ({ businessData }) => {
  const { theme } = useTheme();
  const { setSelectedBusiness, setOpenBusinessModal } = useSelectedBusiness();
  const businessLabel = defaultBusiness.find(
    (item) => item.value === businessData.business.type
  )?.label;

  const businessIcon = businessData.business?.iconType || 0;
  const businessIcons = useBusinessIcons({ size: 24 });
  const icon = () => businessIcons[businessIcon || 0].icon;
  return (
    <Pressable
      onPress={() => {
        setSelectedBusiness(businessData.business.id);
        setOpenBusinessModal(true);
      }}
    >
      <Container
        status={getStatusColor(businessData.balance)}
        key={businessData.business.id}
        containerStyles={{
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: 0,
            padding: 4,
          }}
        >
          <Text
            style={{
              textTransform: "capitalize",
              fontWeight: "bold",
              fontSize: 16,
              lineHeight: 16,
              color: theme === "light" ? "black" : "white",
            }}
          >
            {businessData.business.businessName}
          </Text>
          <Text
            style={{
              textTransform: "capitalize",
              color: "gray",
              fontSize: 12,
            }}
          >
            {businessLabel}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
            rowGap: 6,
            padding: 4,
          }}
        >
          {icon()}
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 24,
              color: theme === "light" ? Colors.black : "white",
            }}
          >
            {businessData.balance.toFixed(0)}
            <Text style={{ fontSize: 20, color: Colors.black }}>€</Text>
          </Text>
        </View>
      </Container>
    </Pressable>
  );
};
