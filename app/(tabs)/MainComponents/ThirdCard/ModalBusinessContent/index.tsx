import { Business } from "@/types/businessTypes";
import { View, Text, ScrollView } from "react-native";
import PieChartMain from "../../MainCard/PieChartMain/PieChartMain";
import { Header } from "./Header";
import { Dispatch, SetStateAction } from "react";
import { useSelectedBusiness } from "../BusinessContext";
import useBusinesses from "@/hooks/useBusinesses";

export const ModalBusinessContent: React.FC = () => {
  const { selectedBusiness } = useSelectedBusiness();
  const businesses = useBusinesses();

  const business = businesses?.data?.find(
    (business) => business.id === selectedBusiness
  ) as Business | undefined;

  if (!selectedBusiness || !business) return;
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
          <PieChartMain businessSelected={selectedBusiness} />
        </View>
      </ScrollView>
    </View>
  );
};
