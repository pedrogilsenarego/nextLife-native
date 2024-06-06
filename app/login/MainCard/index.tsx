import {
  View,
  Text,
  ImageBackground,
  Animated,
  Pressable,
  Keyboard,
} from "react-native";
import Forms from "../Forms";
import LottieView from "lottie-react-native";
import { useRef, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Colors, ColorsProp, useTheme } from "@/providers/ThemeContext";
import SelectColorItem from "./ColorPicker/SelectColorItem";
import ColorPicker from "./ColorPicker";

const MainCard = () => {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const backFadeAnim = useRef(new Animated.Value(0)).current;

  const [flipped, setFlipped] = useState<boolean>(false);
  const { theme } = useTheme();
  const flip = () => {
    Animated.timing(flipAnim, {
      toValue: flipped ? 0 : 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: flipped ? 0 : 1,
      duration: flipped ? 2000 : 400,
      useNativeDriver: true,
    }).start();
    Animated.timing(backFadeAnim, {
      toValue: flipped ? 0 : 1,
      duration: flipped ? 400 : 2000,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setFlipped(flipped ? false : true);
    }, 400);
  };
  const rotateInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const rotateInterpolateFade = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const rotateInterpolateBackFade = backFadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const animatedStyle = {
    transform: [{ rotateY: rotateInterpolate }],
  };
  const animatedStyleFade = {
    opacity: rotateInterpolateFade,
  };
  const animatedStyleBackFade = {
    opacity: rotateInterpolateBackFade,
  };

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <Animated.View
        style={[
          animatedStyle,
          {
            height: "100%",
            display: "flex",
            justifyContent: "center",
            backgroundColor: theme === "light" ? "white" : "black",
            borderRadius: 12,
            position: "relative",
            marginHorizontal: 4,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },

            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        ]}
      >
        <ImageBackground
          imageStyle={{
            opacity: theme === "light" ? 0.9 : 0,
            borderRadius: 12,
            borderWidth: 4,
            borderColor: "white",
            height: "100%",
          }}
          source={require("../../../assets/images/pattern.png")}
          style={{}}
        >
          <Animated.View
            style={[
              animatedStyleFade,
              {
                display: "flex",
                height: "100%",
                position: "relative",
                justifyContent: "center",

                alignItems: "center",
              },
            ]}
          >
            <Pressable
              onPress={flip}
              style={{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                bottom: 15,
                left: 20,
                padding: 4,
              }}
            >
              <Entypo
                name={"arrow-with-circle-left"}
                size={34}
                color={"gray"}
              />
              <Text style={{ color: "gray" }}>Options</Text>
            </Pressable>
            <Forms />

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                columnGap: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  color: "gray",
                  lineHeight: 27,
                }}
              >
                Forgot Password?
              </Text>
              <LottieView
                autoPlay
                style={{
                  width: 40,
                  aspectRatio: 1,
                  opacity: 0.2,
                }}
                source={require("../../../assets/images/Initial.json")}
              />
            </View>
          </Animated.View>

          <Animated.View
            style={[
              animatedStyleBackFade,
              {
                display: flipped ? "flex" : "none",
                height: "100%",
                width: "100%",
                position: "absolute",
                justifyContent: "center",
                //transform: [{ rotateY: "180deg" }],
                alignItems: "center",
              },
            ]}
          >
            <ColorPicker rotate />

            <Pressable
              onPress={flip}
              style={{
                display: "flex",
                position: "absolute",
                alignItems: "center",
                bottom: 15,
                right: 20,
                padding: 4,
              }}
            >
              <Entypo
                name={"arrow-with-circle-right"}
                size={34}
                color={"gray"}
              />
              <Text
                style={{ color: "gray", transform: [{ rotateY: "180deg" }] }}
              >
                Back
              </Text>
            </Pressable>
          </Animated.View>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );
};

export default MainCard;
