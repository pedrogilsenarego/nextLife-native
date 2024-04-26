import Carousel from "react-native-reanimated-carousel";
import MainLayout from "../../layouts/MainLayout";
import BottomCard from "./MainComponents/BottomCard";
import MainCard from "./MainComponents/MainCard";
import { Dimensions, Text, View, Image } from "react-native";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import useUser from "@/hooks/useUser";
import Options from "./Options";
import SecondaryCard from "./MainComponents/SecondaryCard";
import LoaderSpinner from "@/components/Atoms/LoaderSpinner";
import { Colors } from "@/providers/ThemeContext";

export default function TabOneScreen() {
  const width = Dimensions.get("window").width;
  const expenses = useExpenses();
  const incomes = useIncomes();
  const user = useUser();
  const loading = expenses.isLoading || incomes.isLoading || user.isLoading;
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
      <LoaderSpinner color={Colors.black} />
    </View>
  ) : (
    <MainLayout
      mainContent={
        <Carousel
          width={width}
          style={{ paddingBottom: 10 }}
          data={[...new Array(3).keys()]}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ index }) =>
            index === 0 ? (
              <MainCard />
            ) : index === 1 ? (
              <SecondaryCard />
            ) : (
              <Options />
            )
          }
        />
      }
      secondaryContent={<BottomCard />}
    />
  );
}
