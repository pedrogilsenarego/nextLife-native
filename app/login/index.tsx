import { View } from "@/components/Themed";
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";

import BottomCard from "./BottomCard";
import MainCard from "./MainCard";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { useTheme } from "@/providers/ThemeContext";

const Login = () => {
  const width = Dimensions.get("window").width;
  const { mainColor } = useTheme();
  return (
    <SafeAreaView style={{ backgroundColor: mainColor }}>
      <StatusBar barStyle={"light-content"} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={{
            backgroundColor: mainColor,
            display: "flex",
            rowGap: -5,
          }}
        >
          <View
            style={{
              height: "89.5%",
              backgroundColor: mainColor,
            }}
          >
            <Carousel
              width={width}
              style={{ paddingBottom: 10 }}
              data={[...new Array(2).keys()]}
              scrollAnimationDuration={1000}
              onSnapToItem={(index) => console.log("current index:", index)}
              renderItem={({ index }) =>
                index === 0 ? (
                  <MainCard />
                ) : (
                  <Pressable
                    onPress={Keyboard.dismiss}
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: 30,
                    }}
                  >
                    <Text
                      style={{
                        marginTop: 20,
                        fontWeight: "600",
                        color: "white",
                      }}
                    >
                      About
                    </Text>
                    <Text style={{ color: "white" }}>
                      This project aims to foster a vibrant community by
                      continually enhancing the application with new features
                      and improved user experiences. Our goal is to provide
                      users with a dynamic and evolving platform that adapts to
                      their needs over time. To ensure the highest level of
                      security for user data, we leverage third-party data
                      centers, which entail associated costs. As the application
                      grows, it may become necessary to implement monetization
                      strategies to sustain its operation and further
                      development efforts.
                    </Text>
                  </Pressable>
                )
              }
            />
          </View>
          <BottomCard />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Login;
