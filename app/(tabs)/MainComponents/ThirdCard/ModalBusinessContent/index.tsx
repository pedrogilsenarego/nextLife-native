import { Colors, useTheme } from "@/providers/ThemeContext";
import { Business } from "@/types/businessTypes";
import { View, Text, ScrollView } from "react-native";
import ChartInitial from "../../MainCard/ChartInitial";
import PieChartMain from "../../MainCard/PieChartMain/PieChartMain";
import { defaultBusiness } from "@/constants/defaultBusinesses";

type Props = {
  business: Business;
};

export const ModalBusinessContent: React.FC<Props> = ({ business }) => {
  const { theme } = useTheme();
  const businessLabel = defaultBusiness.find(
    (item) => item.value === business.type
  )?.label;
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          marginTop: 55,
          alignItems: "flex-start",
          width: "100%",
          paddingBottom: 10,
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
        <Text
          style={{
            color: Colors.gray,
            textTransform: "capitalize",
            fontSize: 12,
            fontWeight: "600",
          }}
        >
          {businessLabel}
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        style={{
          borderRadius: 8,

          position: "relative",
          height: "100%",
        }}
      >
        <View style={{ marginTop: 20 }}>
          <PieChartMain businessSelected={business.id} />
        </View>
      </ScrollView>
    </View>
  );
};
