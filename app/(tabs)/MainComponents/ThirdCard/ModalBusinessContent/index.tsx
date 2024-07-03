import { Colors, useTheme } from "@/providers/ThemeContext";
import { Business } from "@/types/businessTypes";
import { View, Text, ScrollView } from "react-native";
import ChartInitial from "../../MainCard/ChartInitial";
import PieChartMain from "../../MainCard/PieChartMain/PieChartMain";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import useBusinesses from "@/hooks/useBusinesses";
import { Header } from "./Header";

type Props = {
  business: Business;
};

export const ModalBusinessContent: React.FC<Props> = ({ business }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Header business={business} />
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
