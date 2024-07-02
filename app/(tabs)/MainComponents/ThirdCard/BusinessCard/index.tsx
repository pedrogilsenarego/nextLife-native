import { Container } from "@/components/Atoms/Container";
import { IconCard } from "@/components/Atoms/IconCard";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import useMetrics from "@/hooks/useMetrics";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { Business } from "@/types/businessTypes";
import { getStatusColor } from "@/utils/business";
import { AntDesign } from "@expo/vector-icons";
import { View, Text, Pressable } from "react-native";

type Props = {
  business: Business;
  onPress: () => void;
};

export const BusinessCard: React.FC<Props> = ({ business, onPress }) => {
  const { theme, mainColor } = useTheme();
  const { getExpensesPerBusiness, getIncomesPerBusiness } = useMetrics();
  const businessLabel = defaultBusiness.find(
    (item) => item.value === business.type
  )?.label;
  const totalExpenses = getExpensesPerBusiness(business.id);
  const totalIncomes = getIncomesPerBusiness(business.id);
  const balance = totalIncomes - totalExpenses;
  return (
    <Pressable onPress={onPress}>
      <Container
        status={getStatusColor(balance)}
        key={business.id}
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
            rowGap: 5,
          }}
        >
          <IconCard />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: theme === "light" ? "black" : "white",
            }}
          >
            {balance.toFixed(0)} €
          </Text>
        </View>
      </Container>
    </Pressable>
  );
};
