import {
  View,
  Keyboard,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  Pressable,
  Animated,
  Platform,
} from "react-native";
import MainCard from "../MainCard";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import Info from "../Info";
import useMainLayout from "./useMainLayout";

type Props = {
  mainContent: React.ReactNode;
};

const MainLayout = () => {
  const {
    width,
    mainColor,
    animatedStyle,
    pan,
    panResponder,
    componentRef,
    setComponentHeight,
    setOpenModal,
    openModal,
    runSpringAnimation,
    theme,
  } = useMainLayout();

  return (
    <SafeAreaView style={{ backgroundColor: mainColor }}>
      <StatusBar barStyle={"light-content"} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={{
            backgroundColor: mainColor,
            display: "flex",
            rowGap: -5,
            height: "100%",
          }}
        >
          <Animated.View
            style={[
              animatedStyle,
              {
                height: "95.5%",
              },
            ]}
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
                        fontSize: 20,
                      }}
                    >
                      About
                    </Text>
                    <Text style={{ color: "whitesmoke", marginTop: 6 }}>
                      This project aims to foster a vibrant community by
                      continually enhancing the application with new features
                      and improved user experiences.
                      {`\n`}
                      {`\n`} Our goal is to provide users with a dynamic and
                      evolving platform that adapts to their needs over time. To
                      ensure the highest level of security for user data, we
                      leverage third-party data centers, which entail associated
                      costs.{`\n`}
                      {`\n`} As the application grows, it may become necessary
                      to implement monetization strategies to sustain its
                      operation and further development efforts.{`\n`}
                      {"\n"}
                      <Text style={{ fontWeight: "600" }}>
                        pedrogilsenarego@gmail.com
                      </Text>
                    </Text>
                  </Pressable>
                )
              }
            />
          </Animated.View>

          <>
            <Animated.View
              style={[
                { transform: pan.getTranslateTransform() },
                { zIndex: 1000 },
              ]}
            >
              <View {...panResponder.panHandlers} style={{ height: "100%" }}>
                <View
                  ref={componentRef}
                  onLayout={(event) => {
                    const { height } = event.nativeEvent.layout;
                    setComponentHeight(height);
                  }}
                  style={{
                    backgroundColor: theme === "light" ? "white" : "black",
                    marginHorizontal: 4,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 12,
                    shadowColor: "#000",

                    paddingBottom: 100,
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5, // Android only
                  }}
                >
                  <Info />

                  <View style={{ width: "100%", paddingHorizontal: 30 }}>
                    <Text style={{ marginTop: 20, fontWeight: "600" }}>
                      Version (1.0.0)
                    </Text>
                    <Text style={{ marginTop: 5 }}>
                      &#183; Adding Expenses and Incomes
                    </Text>
                    <Text>&#183; Checking main Metrics</Text>
                    <Text>&#183; Login, Logout and Register New User</Text>
                    <Text>&#183; Change Main Color</Text>
                    <Text>&#183; Change Theme</Text>
                  </View>
                </View>
              </View>
            </Animated.View>
            {openModal && (
              <Pressable
                onPress={() => {
                  setOpenModal(false);
                  runSpringAnimation(0, 0);
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.0)",
                }}
              />
            )}
          </>
          {Platform.OS === "ios" && (
            <View
              style={{
                position: "absolute",
                backgroundColor: "transparent",
                width: "100%",
                height: 50,
                bottom: -50,
                zIndex: 1000,
              }}
            ></View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default MainLayout;
