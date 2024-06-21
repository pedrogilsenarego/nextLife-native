import {
  View,
  Keyboard,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Pressable,
  Animated as RnAnimated,
  Platform,
} from "react-native";
import React from "react";
import useMainLayout from "./useMainLayout";
import { Header } from "@/app/(tabs)/MainComponents/Header";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { SideOptions } from "@/app/(tabs)/MainComponents/SideOptions";
import { Colors } from "@/providers/ThemeContext";

type Props = {
  mainContent: React.ReactNode;
  secondaryContent: React.ReactNode;
  handleMoveCarousel: (index: number) => void;
  index: SharedValue<number>;
};

const MainLayout = ({
  mainContent,
  secondaryContent,
  handleMoveCarousel,
  index,
}: Props) => {
  const {
    mainColor,
    animatedStyle,
    pan,
    panResponder,
    componentRef,
    setComponentHeight,
    setBottomCardOpen,
    bottomCardOpen,
    sideMenu,

    theme,
    animatedStyle2,
    setSideMenu,
  } = useMainLayout();
  const backgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(mainColor),
    };
  });

  return (
    <SafeAreaView style={{ backgroundColor: mainColor }}>
      <StatusBar barStyle={"light-content"} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Animated.View
          style={[
            {
              display: "flex",

              height: "100%",
            },
            backgroundColorAnimation,
          ]}
        >
          <RnAnimated.View
            style={[
              animatedStyle,

              {
                height: "95.8%",
                position: "relative",
              },
            ]}
          >
            <View style={{ position: "absolute", top: 14, zIndex: 20 }}>
              <Header
                handleMoveCarousel={handleMoveCarousel}
                index={index}
                setSideMenu={setSideMenu}
              />
            </View>

            {mainContent}
          </RnAnimated.View>
          <RnAnimated.View
            style={[
              animatedStyle2,

              {
                position: "absolute",

                zIndex: 2000,
                paddingBottom: 10,
                width: 222,
                right: -250,
                height: "95.8%",
                paddingVertical: 100,
              },
            ]}
          >
            <SideOptions />
          </RnAnimated.View>
          <>
            <RnAnimated.View
              style={[
                { transform: pan.getTranslateTransform() },
                { zIndex: 1000, marginTop: -7 },
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
                    backgroundColor:
                      theme === "light" ? Colors.pearlWhite : Colors.black,
                    marginHorizontal: 4,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 12,
                    shadowColor: "#000",
                    maxHeight: "90%",
                    overflow: "scroll",
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
                  {secondaryContent}
                </View>
              </View>
            </RnAnimated.View>
            {(bottomCardOpen || sideMenu) && (
              <Pressable
                onPress={() => {
                  Keyboard.dismiss();
                  setBottomCardOpen(false);
                  setSideMenu(false);
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
        </Animated.View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default MainLayout;
