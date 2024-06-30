import { useTheme } from "@/providers/ThemeContext";
import { Business } from "@/types/businessTypes";
import { View, Text, ScrollView } from "react-native";
import ChartInitial from "../../MainCard/ChartInitial";
import PieChartMain from "../../MainCard/PieChartMain/PieChartMain";

type Props = {
  business: Business;
};

export const ModalBusinessContent: React.FC<Props> = ({ business }) => {
  const { theme } = useTheme();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      style={{
        borderRadius: 8,

        position: "relative",
        height: "100%",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            marginTop: 55,
            alignItems: "flex-start",
            width: "100%",
          }}
        >
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
        </View>
        <View style={{ marginTop: 20 }}>
          <PieChartMain businessSelected={business.id} />
        </View>
      </View>
    </ScrollView>
  );
};
