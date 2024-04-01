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

const Login = () => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  return (
    <SafeAreaView style={{ backgroundColor: "orangered" }}>
      <StatusBar barStyle={"light-content"} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={{
            backgroundColor: "orangered",
            display: "flex",
            rowGap: 3,
          }}
        >
          <View
            style={{
              height: "88.5%",
              backgroundColor: "orangered",
            }}
          >
            <Carousel
              width={width}
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
