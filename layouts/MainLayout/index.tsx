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
import Header from "@/app/(tabs)/MainComponents/Header";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { SideOptions } from "@/app/(tabs)/MainComponents/SideOptions";
import { Colors } from "@/providers/ThemeContext";
import { CardFooter } from "@/components/Molecules/CardFooter";
import { SideLeftOptions } from "@/app/(tabs)/MainComponents/SideLeftOptions";

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
    sideLeftMenu,
    setSideLeftMenu,
    theme,
    animatedStyle2,
    animatedStyle3,
    deviceWidth,
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
                height: "94.7%",
                position: "relative",
                paddingTop: 56,
              },
            ]}
          >
            <View style={{ position: "absolute", top: 0, zIndex: 20 }}>
              <Header
                setSideMenu={setSideMenu}
                setSideLeftMenu={setSideLeftMenu}
              />
            </View>

            {mainContent}
            <View style={{ position: "absolute", bottom: 8, zIndex: 20 }}>
              <CardFooter
                handleMoveCarousel={handleMoveCarousel}
                index={index}
              />
            </View>
          </RnAnimated.View>
          <RnAnimated.View
            style={[
              animatedStyle2,

              {
                position: "absolute",

                zIndex: 2000,
                paddingBottom: 10,
                width: 252,
                right: -265,
                height: "94.7%",
                paddingVertical: 100,
              },
            ]}
          >
            <SideOptions open={sideMenu} />
          </RnAnimated.View>
          <RnAnimated.View
            style={[
              animatedStyle3,

              {
                position: "absolute",

                zIndex: 2000,
                paddingBottom: 10,
                width: deviceWidth - 50,
                left: -deviceWidth + 50,
                height: "94.7%",

                paddingVertical: 100,
              },
            ]}
          >
            <SideLeftOptions open={sideLeftMenu} />
          </RnAnimated.View>
          <>
            <RnAnimated.View
              style={[
                { transform: pan.getTranslateTransform() },
                {
                  zIndex: 1000,
                  marginTop: 3,
                  overflow: "visible",
                },
              ]}
            >
              <View
                {...panResponder.panHandlers}
                style={{
                  overflow: "visible",
                }}
              >
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

                    borderRadius: 12,

                    overflow: "scroll",
                    paddingBottom: 100,
                    shadowColor: "#000",
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
            {(bottomCardOpen || sideMenu || sideLeftMenu) && (
              <Pressable
                onPress={() => {
                  Keyboard.dismiss();
                  setBottomCardOpen(false);
                  setSideMenu(false);
                  setSideLeftMenu(false);
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
