import { DateRangeValues, useApp } from "@/providers/AppProvider";
import { useTheme, Colors } from "@/providers/ThemeContext";
import { memo, useCallback, useEffect } from "react";
import { Pressable, View } from "react-native";
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

  // Shared values for padding, font size, and background color animation
  const paddingValue = useSharedValue(dateRange === props.alias ? 20 : 10);
  const fontSizeValue = useSharedValue(dateRange === props.alias ? 18 : 14);
  const backgroundColorValue = useSharedValue(
    dateRange === props.alias ? 1 : 0
  );

  // Shared value for triangle translation
  //const triangleTranslateY = useSharedValue(10);

  useEffect(() => {
    // Animate triangle when the selector is active
    // triangleTranslateY.value = withTiming(dateRange === props.alias ? 13 : 0, {
    //   duration: 300,
    // });

    // Animate padding, font size, and background color
    paddingValue.value = withTiming(dateRange === props.alias ? 20 : 10, {
      duration: 300,
    });
    fontSizeValue.value = withTiming(dateRange === props.alias ? 18 : 14, {
      duration: 300,
    });
    backgroundColorValue.value = withTiming(dateRange === props.alias ? 1 : 0, {
      duration: 300,
    });
  }, [dateRange]);

  // Animated style for the button padding and background color
  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingVertical: paddingValue.value,
      backgroundColor: interpolateColor(
        backgroundColorValue.value,
        [0, 1],
        [`${mainColor}B3`, mainColor] // Transition between semi-transparent and solid background color
      ),
    };
  });

  // Animated style for the font size
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      fontSize: fontSizeValue.value,
      color: Colors.white,
    };
  });

  // Animated style for the triangle's translation
  //const animatedTriangleStyle = useAnimatedStyle(() => {
  // return {
  //   transform: [{ translateY: triangleTranslateY.value }],
  //  };
  // });

  return (
    <Pressable onPress={() => handleChange(props.alias)}>
      <View style={{ position: "relative", alignItems: "center" }}>
        {/* Main Button */}
        <Animated.View
          style={[
            animatedStyle,
            {
              paddingHorizontal: 10,
              borderRadius: 4,
              alignItems: "center",
              zIndex: 10,
            },
          ]}
        >
          <Animated.Text
            style={[
              animatedTextStyle,
              {
                fontWeight: "bold",
                color: Colors.white,
              },
            ]}
          >
            {props.value}
          </Animated.Text>
        </Animated.View>

        {/*  <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 8,
              width: 0,
              height: 0,
              borderLeftWidth: 8,
              borderRightWidth: 8,
              borderTopWidth: 6,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderTopColor: mainColor,
            },
            animatedTriangleStyle,
          ]}
        />*/}
      </View>
    </Pressable>
  );
});
