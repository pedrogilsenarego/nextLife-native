import { useTheme } from "@/providers/ThemeContext";
import { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  item: { percentage: number; label: string; value: number };
  totalValues: number;
  bottomLabelHeight: number;
};

export const Bar = (props: Props) => {
  const { mainColor } = useTheme();
  const barHeight = useSharedValue(0);

  useEffect(() => {
    barHeight.value = withTiming(props.item.percentage, {
      duration: 500,
    });
  }, [props.item.percentage]);

  const animatedBarStyle = useAnimatedStyle(() => {
    return {
      height: `${barHeight.value}%`,
    };
  });

  return (
    <View
      style={{
        height: "100%",
        position: "relative",
        backgroundColor: "#ffffff66",
        borderRadius: 4,
        overflow: "hidden",
        width: `${100 / props.totalValues - 10 / props.totalValues}%`,
        justifyContent: "flex-end",
      }}
    >
      <Animated.View
        style={[
          animatedBarStyle,
          {
            backgroundColor: `${mainColor}B3`,
            borderRadius: 4,
            bottom: 0,
          },
        ]}
      />
      <View
        style={{
          marginTop: 4,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          height: props.bottomLabelHeight,
        }}
      >
        <Text style={{ fontSize: 9, lineHeight: 12 }}>{props.item.label}</Text>
      </View>
    </View>
  );
};
