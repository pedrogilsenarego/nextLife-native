import React from "react";
import { View, Pressable } from "react-native";
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Colors, useTheme } from "@/providers/ThemeContext";

type Props = {
  handleMoveCarousel: (index: number) => void;
  index: SharedValue<number>;
};

export const StateSelecter: React.FC<Props> = ({
  handleMoveCarousel,
  index,
}) => {
  const { mainColor, contrastColor, theme } = useTheme();
  const BUTTON_WIDTH = 26;
  const BUTTON_GAP = 2;

  const animationLeft = useAnimatedStyle(() => {
    return {
      left: 2,
      top: 2,
      position: "absolute",
      backgroundColor: mainColor,
      borderRadius: 13,
      height: BUTTON_WIDTH,
      width: BUTTON_WIDTH,
      transform: [
        {
          translateX: withTiming(
            BUTTON_WIDTH * index.value + (BUTTON_GAP + 4) * index.value,
            {
              duration: 200,
              easing: Easing.ease,
            }
          ),
        },
      ],
    };
  });

  return (
    <View
      style={{
        backgroundColor: theme === "light" ? Colors.black : "#ffffff1A",
        width: "auto",
        borderRadius: 24,
        flexDirection: "row",
        display: "flex",
        padding: 0,
        position: "relative",
        columnGap: BUTTON_GAP,
      }}
    >
      <Animated.View style={animationLeft} />
      <Pressable
        onPress={() => handleMoveCarousel(0)}
        style={{
          borderRadius: 18,
          padding: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Entypo
          name="home"
          color={
            theme === "light"
              ? index.value === 0
                ? "white"
                : "#ffffff66"
              : contrastColor
          }
          size={14}
        />
      </Pressable>
      <Pressable
        onPress={() => handleMoveCarousel(1)}
        style={{
          borderRadius: 18,
          padding: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AntDesign
          name="dotchart"
          color={
            theme === "light"
              ? index.value === 1
                ? "white"
                : "#ffffff66"
              : contrastColor
          }
          size={14}
        />
      </Pressable>
      <Pressable
        onPress={() => handleMoveCarousel(2)}
        style={{
          borderRadius: 18,
          padding: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AntDesign
          name="piechart"
          color={
            theme === "light"
              ? index.value === 2
                ? "white"
                : "#ffffff66"
              : contrastColor
          }
          size={14}
        />
      </Pressable>
    </View>
  );
};
