import { Business } from "@/types/businessTypes";
import { View, Text, ScrollView, Pressable } from "react-native";
import PieChartMain from "../../MainCard/PieChartMain/PieChartMain";
import { useState } from "react";
import { useSelectedBusiness } from "../BusinessContext";
import useBusinesses from "@/hooks/useBusinesses";
import Content from "../../MainCard/Content";

import { ArrayButtonsIcons } from "@/components/Molecules/ArrayButtonsIcons";

import { Settings } from "./Settings";
import { useTheme } from "@/providers/ThemeContext";
import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { defaultBusiness } from "@/constants/defaultBusinesses";

type Props = {
  businessData: {
    business: Business;
    balance: number;
  }[];
};

export const ModalBusinessContent: React.FC<Props> = (props) => {
  const { mainColor } = useTheme();
  const [mode, setMode] = useState(0);
  const businesses = useBusinesses();
  const { setSelectedBusiness, selectedBusiness } = useSelectedBusiness();

  const business = businesses?.data?.find(
    (business) => business.id === selectedBusiness
  ) as Business | undefined;

  if (!selectedBusiness || !business) return;
  return (
    <BottomPopup
      fullHeight
      subtitle={
        defaultBusiness.find(
          (item) =>
            item.value ===
            props.businessData.find(
              (business) => business.business.id === selectedBusiness
            )?.business.type
        )?.label
      }
      title={
        props.businessData.find(
          (business) => business.business.id === selectedBusiness
        )?.business.businessName
      }
      openModal={!!selectedBusiness}
      onClose={() => setSelectedBusiness(null)}
      rightHeaderComponent={
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "flex-end",
            columnGap: 4,
          }}
        >
          <ArrayButtonsIcons
            iconSize={10}
            buttonList={["piechart", "dotchart"]}
            onChange={(id) => {
              setMode(id);
            }}
            id={mode}
          />
          <Settings
            businessId={business.id}
            businessName={business.businessName}
          />
        </View>
      }
    >
      <BottomPopupContent styles={{ backgroundColor: mainColor }}>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              marginTop: 6,
              borderWidth: 2,
              backgroundColor: "white",
              borderColor: mainColor,
              paddingVertical: 15,
              paddingHorizontal: 10,
              borderRadius: 6,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.25,
              shadowRadius: 1,
              elevation: 2,
            }}
          >
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
      </BottomPopupContent>
    </BottomPopup>
  );
};
