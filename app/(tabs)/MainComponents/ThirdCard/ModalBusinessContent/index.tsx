import { Business } from "@/types/businessTypes";
import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import PieChartMain from "../../MainCard/PieChartMain/PieChartMain";
import { useRef, useState } from "react";
import { useSelectedBusiness } from "../BusinessContext";
import useBusinesses from "@/hooks/useBusinesses";
import Content from "../../MainCard/Content";

import { ArrayButtonsIcons } from "@/components/Molecules/ArrayButtonsIcons";

import { Settings } from "./Settings";
import { Colors } from "@/providers/ThemeContext";
import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import { FiltersButton } from "@/components/Molecules/CardFooter/FiltersButton";

type Props = {
  businessData: {
    business: Business;
    balance: number;
  }[];
};

export const ModalBusinessContent: React.FC<Props> = (props) => {
  const expenses = useExpenses();
  const incomes = useIncomes();
  const businesses = useBusinesses();
  const { selectedBusiness, openBusinessModal, setOpenBusinessModal } =
    useSelectedBusiness();
  const [moving, setMoving] = useState(false);
  const currentIndex = useSharedValue<number>(0);

  const business = businesses?.data?.find(
    (business) => business.id === selectedBusiness
  ) as Business | undefined;
  const carouselRef = useRef<ICarouselInstance>(null);
  const width = Dimensions.get("window").width;
  if (!selectedBusiness || !business) return;

  const handleMoveCarousel = (index: number) => {
    currentIndex.value = withTiming(index);

    runOnJS(scrollToIndex)(index);
  };

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ index, animated: true });
    }
  };
  return (
    <BottomPopup
      bgColor
      fullHeight
      subtitleColor={Colors.pearlWhite}
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
      openModal={openBusinessModal}
      onClose={() => setOpenBusinessModal(false)}
    >
      <BottomPopupContent
        styles={{
          paddingHorizontal: 0,
          paddingBottom: 0,
        }}
      >
        <Carousel
          ref={carouselRef}
          width={width}
          style={{ paddingBottom: 10 }}
          data={[0, 1, 2]}
          scrollAnimationDuration={1000}
          onScrollEnd={() => setMoving(false)}
          onProgressChange={(offset, total) => {
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
                  marginHorizontal: 6,
                  backgroundColor: Colors.pearlWhite,

                  paddingVertical: 15,

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
                <Pressable>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    style={{
                      borderRadius: 8,
                      paddingHorizontal: 10,
                      position: "relative",
                      height: "100%",
                    }}
                  >
                    <PieChartMain businessSelected={selectedBusiness} />
                  </ScrollView>
                </Pressable>
              </View>
            ) : index === 1 ? (
              <View
                style={{
                  marginHorizontal: 6,
                  backgroundColor: Colors.pearlWhite,

                  paddingVertical: 15,

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
                <Pressable>
                  <Content selectedBusiness={selectedBusiness} />
                </Pressable>
              </View>
            ) : (
              <View
                style={{
                  marginHorizontal: 6,
                  backgroundColor: Colors.pearlWhite,

                  paddingVertical: 15,

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
                <Pressable>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    style={{
                      borderRadius: 8,
                      paddingHorizontal: 10,
                      position: "relative",
                      height: "100%",
                    }}
                  >
                    <Settings
                      businessId={business.id}
                      businessName={business.businessName}
                      businessType={business.type}
                      selectedBusiness={selectedBusiness}
                    />
                  </ScrollView>
                </Pressable>
              </View>
            )
          }
        />

        <View
          style={{
            height: 50,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 14,
            alignItems: "flex-start",
          }}
        >
          <View style={{ width: "30%" }}>
            <ArrayButtonsIcons
              iconSize={10}
              buttonList={["piechart", "dotchart", "setting"]}
              onChange={handleMoveCarousel}
              id={currentIndex}
            />
          </View>
          <View
            style={{
              width: "40%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: Colors.pearlWhite,
                fontSize: 10,
                lineHeight: 12,
              }}
            >
              {expenses?.data?.length} expenses
            </Text>
            <Text
              style={{
                color: Colors.pearlWhite,
                fontSize: 10,
                lineHeight: 12,
              }}
            >
              {incomes?.data?.length} incomes
            </Text>
          </View>
          <View
            style={{
              width: "30%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <FiltersButton />
          </View>
        </View>
      </BottomPopupContent>
    </BottomPopup>
  );
};
