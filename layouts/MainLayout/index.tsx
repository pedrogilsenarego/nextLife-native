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
import React, { useState } from "react";
import useMainLayout from "./useMainLayout";
import { Header } from "@/app/(tabs)/MainComponents/Header";
import { Card } from "@/components/Atoms/Card";
import { BlurView } from "expo-blur";
import { supabase } from "@/lib/supabase";

type Props = {
  mainContent: React.ReactNode;
  secondaryContent: React.ReactNode;
  handleMoveCarousel: (index: number) => void;
  index: number;
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
    setOpenModal,
    openModal,
    sideMenu,
    runSpringAnimation,
    theme,
    animatedStyle2,
    setSideMenu,
  } = useMainLayout();

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <SafeAreaView style={{ backgroundColor: mainColor }}>
      <StatusBar barStyle={"light-content"} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={{
            backgroundColor: mainColor,
            display: "flex",
            rowGap: -7,
            height: "100%",
          }}
        >
          <Animated.View
            style={[
              animatedStyle,
              animatedStyle2,

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
          </Animated.View>
          <Animated.View
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
            <View
              style={{
                padding: 20,

                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Pressable>
                <Text
                  style={{
                    color: "whitesmoke",
                    fontSize: 24,
                    fontWeight: "600",
                  }}
                >
                  User
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                padding: 20,

                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Pressable onPress={logout}>
                <Text
                  style={{
                    color: "whitesmoke",
                    fontSize: 24,
                    fontWeight: "600",
                  }}
                >
                  Logout
                </Text>
              </Pressable>
            </View>
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
            </Animated.View>
            {(openModal || sideMenu) && (
              <Pressable
                onPress={() => {
                  Keyboard.dismiss();
                  setOpenModal(false);
                  setSideMenu(false);
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
