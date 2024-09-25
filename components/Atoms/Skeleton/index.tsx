import React, { useEffect } from "react";
import { View, StyleSheet, ViewProps, Dimensions } from "react-native";
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
} from "react-native-reanimated";

// Define props type to include optional width, height, borderRadius, and other view props
type Props = {
  width?: number | string; // Allow width to be a number or a string
  height?: number;
  borderRadius?: number;
} & ViewProps; // Include all ViewProps

export const Skeleton: React.FC<Props> = ({
  width = 100,
  height = 20,
  borderRadius = 4,
  ...rest // Capture all other props
}) => {
  // Shared value for opacity
  const opacity = useSharedValue(0.3);

  // Animation effect for the skeleton
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    // Looping opacity animation (fading in and out)
    opacity.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.ease }),
      -1,
      true // Reverse direction on each repeat
    );
  }, []);

  // Calculate the width to ensure it's always a number
  const calculatedWidth =
    typeof width === "string" && width === "100%"
      ? Dimensions.get("window").width
      : width;

  return (
    <View>
      <Animated.View
        {...rest} // Pass all additional props, including styles
        style={[
          styles.skeleton,
          {
            width: typeof calculatedWidth === "number" ? calculatedWidth : 0, // Ensure it's a number
            height,
            borderRadius,
          },
          animatedStyle,
          // Ensure that any styles from the rest props are also applied
          rest.style, // Add this line to ensure margins are included
        ]}
      />
    </View>
  );
};

// Basic styles for the skeleton component
const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#e0e0e0", // Light gray to mimic the skeleton
  },
});

export default Skeleton;
