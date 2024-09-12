import { useApp } from "@/providers/AppProvider";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  item: {
    percentage: number;
    label: string;
    value: number;
    percentage2?: number;
    value2?: number;
  };
  totalValues: number;
  bottomLabelHeight: number;
  color?: string;
  color2?: string;
};

export const Bar = (props: Props) => {
  const { mainColor } = useTheme();
  const { changeSelectedDate, selectedDate } = useApp();

  const barHeight = useSharedValue(0);
  const barHeight2 = useSharedValue(0);
  const barWidth = useSharedValue(props.item.percentage2 ? "50%" : "100%");
  const barWidth2 = useSharedValue(props.item.percentage2 ? "50%" : "0%");

  useEffect(() => {
    // Animate the height of the first bar
    barHeight.value = withTiming(props.item.percentage, {
      duration: 500,
    });

    // Animate the height of the second bar if it exists
    if (props.item.percentage2) {
      barHeight2.value = withTiming(props.item.percentage2, {
        duration: 500,
      });
    }

    // Animate the width of the bars based on whether there is a second value (percentage2)
    if (props.item.percentage2) {
      barWidth.value = withTiming("50%", { duration: 500 });
      barWidth2.value = withTiming("50%", { duration: 500 });
    } else {
      barWidth.value = withTiming("100%", { duration: 500 });
      barWidth2.value = withTiming("0%", { duration: 500 });
    }
  }, [props.item.percentage, props.item.percentage2]);

  const animatedBarStyle = useAnimatedStyle(() => {
    return {
      height: `${barHeight.value}%`,
    };
  });

  const animatedBarStyle2 = useAnimatedStyle(() => {
    return {
      height: `${barHeight2.value}%`,
    };
  });

  //@ts-ignore
  const animatedBarWidth = useAnimatedStyle(() => {
    return {
      width: barWidth.value,
    };
  });

  //@ts-ignore
  const animatedBarWidth2 = useAnimatedStyle(() => {
    return {
      width: barWidth2.value,
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
      <View style={{ flexDirection: "row" }}>
        <Animated.View
          style={[
            {
              height: "100%",
              position: "relative",
              borderRadius: 4,
              overflow: "hidden",
              justifyContent: "flex-end",
            },
            animatedBarWidth,
          ]}
        >
          <Animated.View
            style={[
              animatedBarStyle,
              {
                backgroundColor:
                  selectedDate === props.item.label
                    ? props.color || mainColor
                    : `${props.color || mainColor}B3`,
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
                <Text
                  style={{
                    fontSize: props.item.percentage2 ? 10 : 14,
                    paddingHorizontal: 4,
                  }}
                >
                  {props.item.value &&
                    (props.item.value > 1000
                      ? (props.item.value / 1000).toFixed(1) + "k"
                      : props.item.value.toFixed(1))}
                  €
                </Text>
              </View>
            </View>
          )}
        </Animated.View>

        {props.item.percentage2 && (
          <Animated.View
            style={[
              {
                height: "100%",
                position: "relative",
                borderRadius: 4,
                overflow: "hidden",
                justifyContent: "flex-end",
              },
              animatedBarWidth2,
            ]}
          >
            <Animated.View
              style={[
                animatedBarStyle2,
                {
                  backgroundColor:
                    selectedDate === props.item.label
                      ? props.color2 || mainColor
                      : `${props.color2 || mainColor}B3`,
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
                  <Text
                    style={{
                      fontSize: props.item.percentage2 ? 10 : 14,
                      paddingHorizontal: 4,
                    }}
                  >
                    {props.item.value2 &&
                      (props.item.value2 > 1000
                        ? (props.item.value2 / 1000).toFixed(1) + "k"
                        : props.item.value2.toFixed(1))}
                    €
                  </Text>
                </View>
              </View>
            )}
          </Animated.View>
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
