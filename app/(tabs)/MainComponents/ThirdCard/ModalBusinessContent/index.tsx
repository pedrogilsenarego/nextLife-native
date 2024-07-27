import { Business } from "@/types/businessTypes";
import { View, Text, ScrollView, Pressable } from "react-native";
import PieChartMain from "../../MainCard/PieChartMain/PieChartMain";
import { Header } from "./Header";
import { Dispatch, SetStateAction, useState } from "react";
import { useSelectedBusiness } from "../BusinessContext";
import useBusinesses from "@/hooks/useBusinesses";
import Content from "../../MainCard/Content";

export const ModalBusinessContent: React.FC = () => {
  const { selectedBusiness } = useSelectedBusiness();
  const [mode, setMode] = useState<"chart" | "pie">("pie");
  const businesses = useBusinesses();

  const business = businesses?.data?.find(
    (business) => business.id === selectedBusiness
  ) as Business | undefined;

  if (!selectedBusiness || !business) return;
  return (
    <View style={{ alignItems: "center" }}>
      <Header business={business} />
      <View style={{ flexDirection: "row", columnGap: 20 }}>
        <Pressable onPress={() => setMode("pie")}>
          <Text>Categories</Text>
        </Pressable>
        <Pressable onPress={() => setMode("chart")}>
          <Text>Chart</Text>
        </Pressable>
      </View>

      <View style={{ marginTop: 20 }}>
        {mode === "pie" ? (
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
