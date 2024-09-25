import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
} from "react-native-reanimated";

type Props = {
  width?: number;
  height?: number;
  borderRadius?: number;
};

export const Skeleton: React.FC<Props> = ({
  width = 200,
  height = 20,
  borderRadius = 10,
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
      true // reverse direction on each repeat
    );
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.skeleton,
          { width, height, borderRadius },
          animatedStyle,
        ]}
      />
    </View>
  );
};

// Basic styles for the skeleton component
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  skeleton: {
    backgroundColor: "#e0e0e0", // light gray to mimic the skeleton
  },
});

export default Skeleton;
