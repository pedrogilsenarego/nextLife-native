import { Colors, useTheme } from "@/providers/ThemeContext";
import { View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

type DataType = {
  label: string;
  value: number;
};

type Props = {
  leftLabel?: boolean;
  height?: number;
  data?: DataType[];
};

const BarChart = (props: Props) => {
  const { mainColor } = useTheme();
  const labelWidth = 7;
  const chartHeight = props.height || 250;
  const bottomLabelHeight = 12;

  const maxValue = props.data ? Math.max(...props.data.map((d) => d.value)) : 1;
  const data2Use =
    props.data?.map((item) => ({
      ...item,
      percentage: (item.value / maxValue) * 100,
    })) || [];

  const totalValue =
    props.data?.reduce((acc, item) => acc + item.value, 0) || 0;
  const avgAbsolute = props.data?.length ? totalValue / props.data.length : 0;
  const avgPercentage = (avgAbsolute / maxValue) * 100;

  // Shared value for the average line's position
  const avgPosition = useSharedValue(100 - avgPercentage);

  // Animate the average line's position when avgPercentage changes
  useEffect(() => {
    avgPosition.value = withTiming(100 - avgPercentage, {
      duration: 500, // Animation duration
    });
  }, [avgPercentage]);

  // Animated style for the average line's position
  const animatedAvgLineStyle = useAnimatedStyle(() => {
    return {
      top: `${avgPosition.value}%`,
    };
  });

  return (
    <View style={{ height: chartHeight, flexDirection: "row" }}>
      {props.leftLabel && (
        <View
          style={{
            width: `${labelWidth}%`,
            alignItems: "flex-start",
            height: chartHeight - bottomLabelHeight,
          }}
        >
          <Text style={{ fontSize: 10 }}>
            {maxValue > 1000 ? (maxValue / 1000).toFixed(1) + "k" : maxValue}
          </Text>
        </View>
      )}
      <View
        style={{
          width: labelWidth ? `${100 - labelWidth}%` : "100%",
          flexDirection: "row",
          position: "relative",
          justifyContent: "space-between",
        }}
      >
        {/* Animated average line */}
        <Animated.View
          style={[
            {
              height: 1,
              borderBottomWidth: 1,
              borderColor: "black",
              borderStyle: "dashed",
              width: "100%",
              position: "absolute",
              zIndex: 20,
            },
            animatedAvgLineStyle, // Apply the animated style here
          ]}
        >
          <View style={{ position: "relative" }}>
            <View
              style={{
                position: "absolute",
                top: 4,
                left: 2,
                backgroundColor: Colors.pearlWhite,
                padding: 1,
                borderRadius: 3,
                shadowOffset: { width: 0, height: 1 },
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 2,
                elevation: 1,
              }}
            >
              <Text style={{ fontSize: 12, paddingHorizontal: 4 }}>
                {avgAbsolute > 1000
                  ? (avgAbsolute / 1000).toFixed(1) + "k"
                  : avgAbsolute.toFixed(1)}
              </Text>
            </View>
          </View>
        </Animated.View>

        {data2Use.map((item, index) => {
          // Animated shared value to animate the height
          const barHeight = useSharedValue(0);

          // Update the height when data changes
          useEffect(() => {
            barHeight.value = withTiming(item.percentage, {
              duration: 500, // Animation duration
            });
          }, [item.percentage]);

          // Animated style for the bar height
          const animatedBarStyle = useAnimatedStyle(() => {
            return {
              height: `${barHeight.value}%`, // Height controlled by animation
            };
          });

          return (
            <View
              key={index}
              style={{
                height: "100%",
                position: "relative",
                backgroundColor: "#ffffff66",
                borderRadius: 4,
                overflow: "hidden",
                width: `${100 / data2Use.length - 10 / data2Use.length}%`,
                justifyContent: "flex-end",
              }}
            >
              {/* Animated bar */}
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
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  height: bottomLabelHeight,
                }}
              >
                <Text style={{ fontSize: 9, lineHeight: 12 }}>
                  {item.label}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default BarChart;
