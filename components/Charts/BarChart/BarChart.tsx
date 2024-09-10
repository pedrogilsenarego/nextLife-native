import { Colors, useTheme } from "@/providers/ThemeContext";
import { View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { Bar } from "./Bar";

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

  const avgPosition = useSharedValue(100 - avgPercentage);

  useEffect(() => {
    avgPosition.value = withTiming(100 - avgPercentage, {
      duration: 500, // Animation duration
    });
  }, [avgPercentage]);

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
          width: props.leftLabel ? `${100 - labelWidth}%` : "100%",
          flexDirection: "row",
          position: "relative",

          justifyContent: "space-between",
        }}
      >
        <Animated.View
          style={[
            {
              height: 1,
              borderBottomWidth: 1,
              borderColor: "gray",
              //borderStyle: "dashed",
              width: "100%",
              position: "absolute",
              zIndex: 20,
            },
            animatedAvgLineStyle,
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
                  : avgAbsolute.toFixed(1) + "k"}
              </Text>
            </View>
          </View>
        </Animated.View>

        {data2Use?.map((item, index) => {
          return (
            <Bar
              item={item}
              key={index}
              totalValues={data2Use.length}
              bottomLabelHeight={bottomLabelHeight}
            />
          );
        })}
      </View>
    </View>
  );
};

export default BarChart;
