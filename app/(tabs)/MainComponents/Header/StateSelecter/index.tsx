import { Colors, useTheme } from "@/providers/ThemeContext";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, View } from "react-native";

type Props = {
  handleMoveCarousel: (index: number) => void;
  index: number;
};
export const StateSelecter: React.FC<Props> = ({
  handleMoveCarousel,
  index,
}) => {
  const BUTTON_WIDTH = 26;
  const BUTTON_GAP = 2;
  const animationLeft = useRef(new Animated.Value(0)).current;

  const { theme, mainColor, contrastColor } = useTheme();
  const handlePress = (index: number) => {
    handleMoveCarousel(index);

    // const totalLeft = BUTTON_WIDTH * index + (BUTTON_GAP + 4) * index;

    // Animated.timing(animationLeft, {
    //   toValue: totalLeft,
    //   duration: 200,
    //   useNativeDriver: false,
    //   easing: Easing.ease,
    // }).start();
  };

  useEffect(() => {
    const totalLeft = BUTTON_WIDTH * index + (BUTTON_GAP + 4) * index;

    Animated.timing(animationLeft, {
      toValue: totalLeft,
      duration: 200,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();
  }, [index]);

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
      <Animated.View
        style={{
          left: 2,
          top: 2,
          position: "absolute",
          backgroundColor: mainColor,
          borderRadius: 13,
          height: BUTTON_WIDTH,
          width: BUTTON_WIDTH,
          transform: [
            {
              translateX: animationLeft,
            },
          ],
        }}
      />
      <Pressable
        onPress={() => {
          handlePress(0);
        }}
        style={{
          //backgroundColor: mainColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 18,
          padding: 8,
        }}
      >
        <Entypo
          name="home"
          color={
            theme === "light"
              ? index === 0
                ? "white"
                : "#ffffff66"
              : contrastColor
          }
          size={14}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          handlePress(1);
        }}
        style={{
          //backgroundColor: mainColor,
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
              ? index === 1
                ? "white"
                : "#ffffff66"
              : contrastColor
          }
          size={14}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          handlePress(2);
        }}
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
              ? index === 2
                ? "white"
                : "#ffffff66"
              : contrastColor
          }
          style={{ opacity: 0.7 }}
          size={14}
        />
      </Pressable>
    </View>
  );
};
