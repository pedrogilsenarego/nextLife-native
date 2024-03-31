import { View, Text, ImageBackground, Animated, Pressable } from "react-native";
import Forms from "../Forms";
import LottieView from "lottie-react-native";
import { useRef, useState } from "react";
import { Entypo } from "@expo/vector-icons";

const MainCard = () => {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState<boolean>(false);
  const flip = () => {
    Animated.timing(flipAnim, {
      toValue: flipped ? 0 : 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: flipped ? 0 : 1,
      duration: flipped ? 2200 : 400,
      useNativeDriver: true,
    }).start();
    setFlipped(flipped ? false : true);
  };
  const rotateInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const rotateInterpolateFade = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const animatedStyle = {
    transform: [{ rotateY: rotateInterpolate }],
  };
  const animatedStyleFade = {
    opacity: rotateInterpolateFade,
  };

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          height: "88.5%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: 12,

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
          opacity: 0.9,
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
              right: 20,
              padding: 4,
            }}
          >
            <Entypo name={"arrow-with-circle-right"} size={34} color={"gray"} />
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
      </ImageBackground>
    </Animated.View>
  );
};

export default MainCard;
