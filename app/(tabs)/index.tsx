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
import { useRef } from "react";

export default function TabOneScreen() {
  const width = Dimensions.get("window").width;
  const expenses = useExpenses();
  const incomes = useIncomes();
  const user = useUser();
  const loading = expenses.isLoading || incomes.isLoading || user.isLoading;
  const carouselRef = useRef<ICarouselInstance>(null);
  const handleMoveCarousel = (index: number) => {
    if (carouselRef.current) {
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
        style={{ width: 120, objectFit: "contain" }}
        source={require("../../assets/images/logo.png")}
      />
    </View>
  ) : (
    <MainLayout
      handleMoveCarousel={handleMoveCarousel}
      mainContent={
        <Carousel
          ref={carouselRef}
          width={width}
          style={{ paddingBottom: 10 }}
          data={[...new Array(3).keys()]}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => console.log("current index:", index)}
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
