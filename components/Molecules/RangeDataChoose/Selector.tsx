import { DateRangeValues, useApp } from "@/providers/AppProvider";
import { useTheme, Colors } from "@/providers/ThemeContext";
import { memo, useCallback, useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

type SelectorProps = {
  alias: DateRangeValues;
  value: string;
};

export const Selector = memo((props: SelectorProps) => {
  const { dateRange, changeDateRange, changeSelectedDate } = useApp();
  const { mainColor } = useTheme();

  // Function to handle changing date range
  const handleChange = useCallback(
    (key: DateRangeValues) => {
      changeSelectedDate("Total");
      changeDateRange(key);
    },
    [changeDateRange, changeSelectedDate]
  );

  // Shared value for padding and font size animation
  const paddingValue = useSharedValue(dateRange === props.alias ? 20 : 10);
  const fontSizeValue = useSharedValue(dateRange === props.alias ? 18 : 14); // Add font size animation

  // Shared value for triangle translation
  const triangleTranslateY = useSharedValue(10); // Initially hidden behind the div

  // Shared value for color animation (from Colors.white66 to Colors.white)
  const textColorValue = useSharedValue(dateRange === props.alias ? 1 : 0); // 1 for active, 0 for inactive

  useEffect(() => {
    // Animate the triangle when the selector is active
    triangleTranslateY.value = withTiming(dateRange === props.alias ? 13 : 0, {
      duration: 300,
    });

    // Animate padding and font size when selector is active
    paddingValue.value = withTiming(dateRange === props.alias ? 20 : 10, {
      duration: 300,
    });
    fontSizeValue.value = withTiming(dateRange === props.alias ? 18 : 14, {
      duration: 300,
    });

    // Animate text color from white66 to white
    textColorValue.value = withTiming(dateRange === props.alias ? 1 : 0, {
      duration: 300,
    });
  }, [dateRange]);

  // Animated style for the button padding
  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingVertical: paddingValue.value,
    };
  });

  // Animated style for the font size
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      fontSize: fontSizeValue.value, // Animate the font size change
      color: interpolateColor(
        textColorValue.value,
        [0, 1],
        [`${Colors.white}66`, Colors.white] // Interpolate between Colors.white66 and Colors.white
      ),
    };
  });

  // Animated style for the triangle's translation
  const animatedTriangleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: triangleTranslateY.value }],
    };
  });

  return (
    <Pressable onPress={() => handleChange(props.alias)}>
      <View style={{ position: "relative", alignItems: "center" }}>
        {/* Main Button */}
        <Animated.View
          style={[
            animatedStyle,
            {
              backgroundColor: mainColor,
              paddingHorizontal: 10,
              borderRadius: 4,
              alignItems: "center",
              zIndex: 10,
            },
          ]}
        >
          <Animated.Text
            style={[
              animatedTextStyle, // Apply animated font size and color
              {
                fontWeight: "bold",
              },
            ]}
          >
            {props.value}
          </Animated.Text>
        </Animated.View>

        {/* Triangle - Always present but translated */}
        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 8, // Initially positioned under the button
              width: 0,
              height: 0,
              borderLeftWidth: 8,
              borderRightWidth: 8,
              borderTopWidth: 6, // Upside down triangle using border-top
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderTopColor: mainColor, // Triangle's color
            },
            animatedTriangleStyle, // Animated translation
          ]}
        />
      </View>
    </Pressable>
  );
});
