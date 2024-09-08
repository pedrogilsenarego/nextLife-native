import { DateRangeValues, useApp } from "@/providers/AppProvider";
import { useTheme } from "@/providers/ThemeContext";
import { memo, useCallback, useEffect } from "react";
import { Pressable, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type SelectorProps = {
  alias: DateRangeValues;
  value: string;
};

export const Selector = memo((props: SelectorProps) => {
  const { dateRange, changeDateRange, changeSelectedDate } = useApp();
  const { mainColor } = useTheme();
  const handleChange = useCallback(
    (key: DateRangeValues) => {
      changeSelectedDate("Total");
      changeDateRange(key);
    },
    [changeDateRange, changeSelectedDate]
  );

  const paddingValue = useSharedValue(dateRange === props.alias ? 20 : 10);

  useEffect(() => {
    paddingValue.value = withTiming(dateRange === props.alias ? 20 : 10, {
      duration: 300,
    });
  }, [dateRange]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingVertical: paddingValue.value,
    };
  });

  return (
    <Pressable onPress={() => handleChange(props.alias)}>
      <Animated.View
        style={[
          animatedStyle,
          {
            backgroundColor: mainColor,
            paddingHorizontal: 10,
            borderRadius: 4,
          },
        ]}
      >
        <Text
          style={{
            color: "white",
            fontSize: dateRange === props.alias ? 18 : 16,
            fontWeight: dateRange === props.alias ? "bold" : "normal",
          }}
        >
          {props.value}
        </Text>
      </Animated.View>
    </Pressable>
  );
});
