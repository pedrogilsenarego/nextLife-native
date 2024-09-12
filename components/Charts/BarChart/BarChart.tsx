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
  value2?: number;
};

type Props = {
  leftLabel?: boolean;
  height?: number;
  color?: string;
  color2?: string;
  data?: DataType[];
};

const BarChart = (props: Props) => {
  const labelWidth = 7;
  const chartHeight = props.height || 250;
  const bottomLabelHeight = 12;

  const maxValue = props.data
    ? Math.max(...props.data.map((d) => Math.max(d.value, d.value2 ?? 0)))
    : 1;

  const data2Use =
    props.data?.map((item) => ({
      ...item,
      percentage: (item.value / maxValue) * 100,
      percentage2: item.value2 ? (item.value2 / maxValue) * 100 : undefined,
    })) || [];

  const totalValue =
    props.data?.reduce((acc, item) => acc + item.value, 0) || 0;
  const totalValue2 =
    props.data?.reduce((acc, item) => acc + (item.value2 ?? 0), 0) || 0;

  const avgAbsolute = props.data?.length ? totalValue / props.data.length : 0;
  const avgAbsolute2 = props.data?.some((item) => item.value2 !== undefined)
    ? totalValue2 / props.data.length
    : undefined;
  const avgPercentage = (avgAbsolute / maxValue) * 100;
  const avgPercentage2 = avgAbsolute2
    ? (avgAbsolute2 / maxValue) * 100
    : undefined;

  const avgPosition = useSharedValue(100 - avgPercentage);
  const avgPosition2 = useSharedValue(
    avgPercentage2 ? 100 - avgPercentage2 : 0
  );

  useEffect(() => {
    avgPosition.value = withTiming(100 - avgPercentage, {
      duration: 500, // Animation duration
    });
  }, [avgPercentage]);

  useEffect(() => {
    if (avgPercentage2 !== undefined) {
      avgPosition2.value = withTiming(100 - avgPercentage2, {
        duration: 500,
      });
    }
  }, [avgPercentage2]);

  const animatedAvgLineStyle = useAnimatedStyle(() => {
    return {
      top: `${avgPosition.value}%`,
    };
  });

  const animatedAvgLineStyle2 = useAnimatedStyle(() => {
    return {
      top: `${avgPosition2.value}%`,
    };
  });

  const renderDashedLine = () => {
    const dashArray = Array.from({ length: 40 });
    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {dashArray.map((_, index) => (
          <View
            key={index}
            style={{
              width: 4,
              height: 1,
              backgroundColor: Colors.lightGray,
              marginRight: 2,
            }}
          />
        ))}
      </View>
    );
  };

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
        {avgPosition2 && avgAbsolute2 && (
          <Animated.View
            style={[
              {
                height: 1,
                width: "100%",
                position: "absolute",
                zIndex: 20,
              },
              animatedAvgLineStyle2,
            ]}
          >
            {renderDashedLine()}
            <View style={{ position: "relative" }}>
              <View
                style={{
                  position: "absolute",
                  top: 3,
                  left: `${100 / data2Use.length / 2}%`,
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
                    ? (avgAbsolute2 / 1000).toFixed(1) + "k"
                    : avgAbsolute2.toFixed(1)}
                </Text>
              </View>
            </View>
          </Animated.View>
        )}
        <Animated.View
          style={[
            {
              height: 1,
              width: "100%",
              position: "absolute",
              zIndex: 20,
            },
            animatedAvgLineStyle,
          ]}
        >
          {renderDashedLine()}
          <View style={{ position: "relative" }}>
            <View
              style={{
                position: "absolute",
                top: 3,
                left: 3,
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

        {data2Use?.map((item, index) => {
          return (
            <Bar
              color={props.color}
              color2={props.color2}
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
