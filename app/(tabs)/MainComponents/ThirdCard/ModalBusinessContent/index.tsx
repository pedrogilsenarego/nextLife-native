import { useTheme } from "@/providers/ThemeContext";
import { Business } from "@/types/businessTypes";
import { View, Text } from "react-native";
import ChartInitial from "../../MainCard/ChartInitial";
import PieChartMain from "../../MainCard/PieChartMain/PieChartMain";

type Props = {
  business: Business;
};

export const ModalBusinessContent: React.FC<Props> = ({ business }) => {
  const { theme } = useTheme();
  return (
    <View style={{ alignItems: "center", marginTop: 100 }}>
      <Text
        style={{
          color: theme === "light" ? "black" : "white",
          textTransform: "capitalize",
          fontSize: 18,
        }}
      >
        {business.businessName}
      </Text>
      <PieChartMain />
    </View>
  );
};
