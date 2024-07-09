import { Business } from "@/types/businessTypes";
import { View, Text, ScrollView } from "react-native";
import PieChartMain from "../../MainCard/PieChartMain/PieChartMain";
import { Header } from "./Header";
import { Dispatch, SetStateAction } from "react";

type Props = {
  business: Business;
  setBusinessSelected: Dispatch<SetStateAction<number | null>>;
};

export const ModalBusinessContent: React.FC<Props> = ({
  business,
  setBusinessSelected,
}) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Header business={business} setBusinessSelected={setBusinessSelected} />
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
