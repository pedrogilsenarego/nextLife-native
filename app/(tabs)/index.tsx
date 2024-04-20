import Carousel from "react-native-reanimated-carousel";
import MainLayout from "../../layouts/MainLayout";
import BottomCard from "./MainComponents/BottomCard";
import MainCard from "./MainComponents/MainCard";
import { Dimensions, Keyboard, Pressable } from "react-native";

export default function TabOneScreen() {
  const width = Dimensions.get("window").width;
  return (
    <MainLayout
      mainContent={
        <Carousel
          width={width}
          style={{ paddingBottom: 10 }}
          data={[...new Array(2).keys()]}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ index }) =>
            index === 0 ? <MainCard /> : <MainCard />
          }
        />
      }
      secondaryContent={<BottomCard />}
    />
  );
}
