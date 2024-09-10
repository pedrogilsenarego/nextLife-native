import { useApp } from "@/providers/AppProvider";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
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
  const { changeSelectedDate, selectedDate } = useApp();

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
    <Pressable
      onPress={() => {
        changeSelectedDate(
          props.item.label === selectedDate ? "Total" : props.item.label
        );
      }}
      style={{
        height: "100%",
        width: `${
          100 / props.totalValues - Math.min(1.5, 10 / props.totalValues)
        }%`,
      }}
    >
      <View
        style={{
          height: "100%",
          position: "relative",
          borderRadius: 4,
          overflow: "hidden",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Animated.View
          style={[
            animatedBarStyle,
            {
              backgroundColor:
                selectedDate === props.item.label
                  ? mainColor
                  : `${mainColor}B3`,
              borderRadius: 4,
              bottom: 0,
            },
          ]}
        />
        {props.item.label === selectedDate && props.totalValues <= 5 && (
          <View
            style={{
              position: "absolute",
              padding: 4,

              width: "100%",
            }}
          >
            <View
              style={{
                backgroundColor: Colors.pearlWhite,
                padding: 4,
                borderRadius: 3,
                shadowOffset: { width: 0, height: 1 },
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 2,
                elevation: 1,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 14, paddingHorizontal: 4 }}>
                {props.item.value.toFixed(1)}€
              </Text>
            </View>
          </View>
        )}
      </View>
      <View
        style={{
          marginTop: 4,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          height: props.bottomLabelHeight,
        }}
      >
        <Text
          style={{ fontSize: props.totalValues > 20 ? 7 : 9, lineHeight: 12 }}
        >
          {props.item.label}
        </Text>
      </View>
    </Pressable>
  );
};
