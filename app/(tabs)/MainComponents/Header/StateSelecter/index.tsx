import React, { useEffect, useState } from "react";
import { View, Pressable, ViewStyle } from "react-native";
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedReaction,
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
  const BUTTON_WIDTH = 18;
  const BUTTON_GAP = 0;
  const ICON_SIZE = 10;
  const ICON_PADDING = 6;
  const BUTTON_PADDING = 2;
  const [selected, setSelected] = useState(0);

  const animationLeft = useAnimatedStyle(() => {
    return {
      left: BUTTON_PADDING,
      top: BUTTON_PADDING,
      position: "absolute",
      backgroundColor: theme === "light" ? mainColor : Colors.black,
      borderRadius: 13,
      height: BUTTON_WIDTH,
      width: BUTTON_WIDTH,
      transform: [
        {
          translateX: withTiming(
            BUTTON_WIDTH * index.value +
              (BUTTON_GAP + BUTTON_PADDING * 2) * index.value,
            {
              duration: 200,
            }
          ),
        },
      ],
    };
  });

  useAnimatedReaction(
    () => {
      return index.value;
    },
    () => {
      runOnJS(setSelected)(index.value);
    },
    []
  );

  return (
    <View
      style={{
        backgroundColor: theme === "light" ? Colors.black : "#ffffff1A",
        width: BUTTON_WIDTH * 3 + BUTTON_PADDING * 2 + BUTTON_GAP * 2 + 8,
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
          padding: ICON_PADDING,
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
          size={ICON_SIZE}
        />
      </Pressable>
      <Pressable
        onPress={() => handleMoveCarousel(1)}
        style={{
          borderRadius: 18,
          padding: ICON_PADDING,
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
          size={ICON_SIZE}
        />
      </Pressable>
      <Pressable
        onPress={() => handleMoveCarousel(2)}
        style={{
          borderRadius: 18,
          padding: ICON_PADDING,
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
          size={ICON_SIZE}
        />
      </Pressable>
    </View>
  );
};
