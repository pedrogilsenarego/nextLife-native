import {
  Appearance,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/providers/ThemeContext";

const SwitchTheme = () => {
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const SWITCH_CONTAINER_WIDTH = width * 0.6;
  const SWITCH_WIDTH = SWITCH_CONTAINER_WIDTH / 2;

  const translateAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const { theme, changeTheme } = useTheme();

  useEffect(() => {
    if (theme === "light") {
      translateX.value = withSpring(SWITCH_WIDTH * 0);
    } else if (theme === "dark") {
      translateX.value = withSpring(SWITCH_WIDTH * 1);
    }
  }, [SWITCH_WIDTH, theme, translateX]);

  const backgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme === "dark" ? withTiming("black") : withTiming("#F0F0F0"),
    };
  });

  const textColorAnimation = useAnimatedStyle(() => {
    return {
      color: theme === "dark" ? withTiming("white") : withTiming("black"),
    };
  });

  const backgroundColorSlideAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme === "dark" ? withTiming("#22272B") : withTiming("white"),
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: SWITCH_CONTAINER_WIDTH,
        },
        backgroundColorAnimation,
      ]}
    >
      <Animated.View
        style={[
          styles.slideContainer,
          {
            width: SWITCH_WIDTH,
          },
          translateAnimation,
        ]}
      >
        <Animated.View
          style={[
            styles.slide,
            {
              width: (width * 0.53) / 2,
            },
            backgroundColorSlideAnimation,
          ]}
        />
      </Animated.View>

      <Pressable
        style={styles.button}
        onPress={() => {
          changeTheme("light");
        }}
      >
        <Animated.Text style={[styles.textButton, textColorAnimation]}>
          Light
        </Animated.Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          changeTheme("dark");
        }}
      >
        <Animated.Text style={[styles.textButton, textColorAnimation]}>
          Dark
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
};

export default SwitchTheme;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 40,
    overflow: "hidden",
    marginTop: 20,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  textButton: {
    color: "black",
    fontWeight: "500",
  },
  slideContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    padding: 23,
    borderRadius: 100,
    backgroundColor: "white",
  },
});
