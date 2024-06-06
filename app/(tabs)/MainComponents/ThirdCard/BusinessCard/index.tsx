import { Container } from "@/components/Atoms/Container";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import useMetrics from "@/hooks/useMetrics";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { Business } from "@/types/businessTypes";
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
  return (
    <Pressable onPress={onPress}>
      <Container
        key={business.id}
        containerStyles={{
          flexDirection: "row",
          alignItems: "stretch",
        }}
      >
        <View>
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
          }}
        >
          <AntDesign
            color={theme === "light" ? mainColor : Colors.greenPuke}
            size={30}
            name="gitlab"
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: theme === "light" ? "black" : "white",
            }}
          >
            {(totalIncomes - totalExpenses).toFixed(0)} €
          </Text>
        </View>
      </Container>
    </Pressable>
  );
};
