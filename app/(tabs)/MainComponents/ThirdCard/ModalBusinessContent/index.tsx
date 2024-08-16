import { Business } from "@/types/businessTypes";
import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import PieChartMain from "../../MainCard/PieChartMain/PieChartMain";
import { useRef, useState } from "react";
import { useSelectedBusiness } from "../BusinessContext";
import useBusinesses from "@/hooks/useBusinesses";
import Content from "../../MainCard/Content";

import { ArrayButtonsIcons } from "@/components/Molecules/ArrayButtonsIcons";

import { Settings } from "./Settings";
import { useTheme } from "@/providers/ThemeContext";
import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";

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
  const [moving, setMoving] = useState(false);
  const currentIndex = useSharedValue<number>(0);
  const business = businesses?.data?.find(
    (business) => business.id === selectedBusiness
  ) as Business | undefined;
  const carouselRef = useRef<ICarouselInstance>(null);
  const width = Dimensions.get("window").width;
  if (!selectedBusiness || !business) return;
  return (
    <BottomPopup
      bgColor
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
          <Settings
            businessId={business.id}
            businessName={business.businessName}
          />
          <ArrayButtonsIcons
            iconSize={10}
            buttonList={["piechart", "dotchart"]}
            onChange={(id) => {
              setMode(id);
            }}
            id={mode}
          />
        </View>
      }
    >
      <BottomPopupContent
        styles={{
          backgroundColor: mainColor,
          paddingHorizontal: 0,
          paddingBottom: 0,
        }}
      >
        <Carousel
          ref={carouselRef}
          width={width}
          style={{ paddingBottom: 10 }}
          data={[...new Array(3).keys()]}
          scrollAnimationDuration={1000}
          onScrollEnd={() => setMoving(false)}
          onProgressChange={(off, total) => {
            if (
              currentIndex.value !== undefined &&
              !moving &&
              Math.abs(total - currentIndex.value) > 0.2
            ) {
              currentIndex.value = carouselRef.current?.getCurrentIndex() || 0;
            }
          }}
          renderItem={({ index }) =>
            index === 0 ? (
              <View
                style={{
                  marginHorizontal: 8,
                  backgroundColor: "white",

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
              </View>
            ) : (
              <View
                style={{
                  marginHorizontal: 8,
                  backgroundColor: "white",

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
                <Content selectedBusiness={selectedBusiness} />
              </View>
            )
          }
        />
        <View style={{ height: 50 }}></View>
      </BottomPopupContent>
    </BottomPopup>
  );
};
