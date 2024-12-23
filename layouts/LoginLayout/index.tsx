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
import React from "react";
import useMainLayout from "./useMainLayout";

type Props = {
  mainContent: React.ReactNode;
  secondaryContent: React.ReactNode;
};

const LoginLayout = ({ mainContent, secondaryContent }: Props) => {
  const {
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

            height: "100%",
          }}
        >
          <Animated.View
            style={[
              animatedStyle,
              {
                height: "95.8%",
                position: "relative",
              },
            ]}
          >
            {mainContent}
          </Animated.View>

          <>
            <Animated.View
              style={[
                { transform: pan.getTranslateTransform() },
                {
                  zIndex: 1000,
                  marginTop: -20,
                  overflow: "visible",
                },
              ]}
            >
              <View
                {...panResponder.panHandlers}
                style={{
                  height: "100%",
                  paddingTop: 13,
                  overflow: "visible",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
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
                    maxHeight: "90%",
                    overflow: "scroll",
                    paddingBottom: 100,
                  }}
                >
                  {secondaryContent}
                </View>
              </View>
            </Animated.View>
            {openModal && (
              <Pressable
                onPress={() => {
                  Keyboard.dismiss();
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

export default LoginLayout;
