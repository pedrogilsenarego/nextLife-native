import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import MainLayout from "../../layouts/MainLayout";
import BottomCard from "./MainComponents/BottomCard";
import MainCard from "./MainComponents/MainCard";
import { Dimensions, Text, View, Image } from "react-native";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import useUser from "@/hooks/useUser";
import Options from "./Options";
import SecondaryCard from "./MainComponents/SecondaryCard";
import { useRef, useState } from "react";

export default function TabOneScreen() {
  const width = Dimensions.get("window").width;
  const expenses = useExpenses();
  const incomes = useIncomes();
  const user = useUser();
  const loading = expenses.isLoading || incomes.isLoading || user.isLoading;
  const carouselRef = useRef<ICarouselInstance>(null);
  const [currentI, setCurrentI] = useState<number | undefined>(0);
  const [moving, setMoving] = useState(false);

  const handleMoveCarousel = (index: number) => {
    if (carouselRef.current) {
      setMoving(true);
      setCurrentI(index);

      carouselRef?.current?.scrollTo({ index, animated: true });
    }
  };
  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Image
        style={{ width: 100, objectFit: "contain" }}
        source={require("../../assets/images/logo.png")}
      />
    </View>
  ) : (
    <MainLayout
      index={currentI || 0}
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
              currentI !== undefined &&
              !moving &&
              Math.abs(total - currentI) > 0.2
            ) {
              setCurrentI(carouselRef.current?.getCurrentIndex());
            }
          }}
          renderItem={({ index }) =>
            index === 0 ? (
              <Options />
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
