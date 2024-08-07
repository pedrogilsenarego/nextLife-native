import { Business } from "@/types/businessTypes";
import { View, Text, ScrollView, Pressable } from "react-native";
import PieChartMain from "../../MainCard/PieChartMain/PieChartMain";
import { Header } from "./Header";
import { useState } from "react";
import { useSelectedBusiness } from "../BusinessContext";
import useBusinesses from "@/hooks/useBusinesses";
import Content from "../../MainCard/Content";

import { ArrayButtonsIcons } from "@/components/Molecules/ArrayButtonsIcons";
import { useSharedValue, withTiming } from "react-native-reanimated";

export const ModalBusinessContent: React.FC = () => {
  const { selectedBusiness } = useSelectedBusiness();

  const [mode, setMode] = useState(0);
  const businesses = useBusinesses();

  const business = businesses?.data?.find(
    (business) => business.id === selectedBusiness
  ) as Business | undefined;

  if (!selectedBusiness || !business) return;
  return (
    <View style={{ alignItems: "center" }}>
      <Header business={business} />

      <ArrayButtonsIcons
        iconSize={30}
        buttonList={["dotchart", "piechart", "setting"]}
        onChange={(id) => {
          setMode(id);
        }}
        id={mode}
      />
      <View style={{ marginTop: 20 }}>
        {mode === 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            style={{
              borderRadius: 8,

              position: "relative",
              height: "100%",
            }}
          >
            <PieChartMain businessSelected={selectedBusiness} />
          </ScrollView>
        ) : (
          <Content selectedBusiness={selectedBusiness} />
        )}
      </View>
    </View>
  );
};
