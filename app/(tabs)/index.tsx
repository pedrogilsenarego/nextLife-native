import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import MainLayout from "../../layouts/MainLayout";
import BottomCard from "./MainComponents/BottomCard";
import MainCard from "./MainComponents/MainCard";
import { Dimensions } from "react-native";

import Options from "./MainComponents/ThirdCard";
import SecondaryCard from "./MainComponents/SecondaryCard";
import { useEffect, useRef, useState } from "react";
import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";

export default function TabOneScreen() {
  const width = Dimensions.get("window").width;
  const [selectedDate, setSelectedDate] = useState<string>("Total");
  const carouselRef = useRef<ICarouselInstance>(null);
  const currentIndex = useSharedValue<number>(0);
  const [moving, setMoving] = useState(false);

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
    <MainLayout
      index={currentIndex}
      handleMoveCarousel={handleMoveCarousel}
      mainContent={
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
              <Options />
            ) : index === 1 ? (
              <MainCard
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            ) : (
              <SecondaryCard setSelectedDate={setSelectedDate} />
            )
          }
        />
      }
      secondaryContent={<BottomCard />}
    />
  );
}
