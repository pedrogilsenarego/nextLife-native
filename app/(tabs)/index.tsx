import { useEffect, useRef, useState } from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { Dimensions } from "react-native";
import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";

import MainLayout from "../../layouts/MainLayout";
import BottomCard from "./MainComponents/BottomCard";
import MainCard from "./MainComponents/MainCard";
import Options from "./MainComponents/ThirdCard";
import SecondaryCard from "./MainComponents/SecondaryCard";
import { SelectedBusinessProvider } from "./MainComponents/ThirdCard/BusinessContext";

import useUser from "@/hooks/useUser";
import Loading from "@/components/Atoms/Loading";
import useExpenses from "@/hooks/useExpenses";
import useDeposits from "@/hooks/useDeposits";
import useReports from "@/hooks/useReports";
import useIncomes from "@/hooks/useIncomes";

export default function TabOneScreen() {
  const width = Dimensions.get("window").width;
  const user = useUser();
  const expenses = useExpenses();
  const incomes = useIncomes();
  const deposits = useDeposits();
  const reports = useReports();

  const carouselRef = useRef<ICarouselInstance>(null);
  const currentIndex = useSharedValue<number>(0);
  const [moving, setMoving] = useState(false);

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (
      !user.isLoading &&
      !expenses.isLoading &&
      !incomes.isLoading &&
      !deposits.isLoading &&
      !reports.isLoading
    ) {
      setIsFirstLoad(false);
    }
  }, [
    user.isLoading,
    expenses.isLoading,
    incomes.isLoading,
    deposits.isLoading,
    reports.isLoading,
  ]);

  const handleMoveCarousel = (index: number) => {
    currentIndex.value = withTiming(index);
    runOnJS(scrollToIndex)(index);
  };

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ index, animated: true });
    }
  };

  if (
    isFirstLoad &&
    (user.isLoading ||
      expenses.isLoading ||
      incomes.isLoading ||
      deposits.isLoading ||
      reports.isLoading)
  ) {
    return <Loading />;
  }

  return (
    <MainLayout
      index={currentIndex}
      handleMoveCarousel={handleMoveCarousel}
      mainContent={
        <Carousel
          ref={carouselRef}
          width={width}
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
              <SelectedBusinessProvider>
                <Options />
              </SelectedBusinessProvider>
            ) : index === 1 ? (
              <MainCard />
            ) : (
              <SecondaryCard />
            )
          }
        />
      }
      secondaryContent={<BottomCard />}
    />
  );
}
