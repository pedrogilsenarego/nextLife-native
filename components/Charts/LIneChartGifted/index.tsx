import { Colors } from "@/providers/ThemeContext";
import { useRef, useState } from "react";
import {
  Dimensions,
  View,
  Text,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { LineChart } from "react-native-gifted-charts";
import { SharedValue, runOnJS } from "react-native-reanimated";

type DataType = {
  label: string;
  value: number;
};

type Props = {
  data: DataType[];
  data2?: DataType[];
  color1: string;
  color2?: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};

export const LineChartGifted = ({
  data,
  data2,
  color1,
  color2,
  setSelectedDate,
}: Props) => {
  const width = Dimensions.get("window").width - 12;

  const minDataValue = Math.min(
    ...data.map((item) => item.value),
    ...(data2 ? data2.map((item) => item.value) : [])
  );

  // Round down the minimum value to the nearest multiple of 1000
  const roundedOffset = Math.floor(minDataValue / 1000) * 1000;
  const spacing = (width - 75) / (data.length - 1);

  const pan = Gesture.Pan();

  return (
    <GestureDetector gesture={pan}>
      <Pressable style={{ position: "relative" }}>
        <LineChart
          data={data}
          yAxisTextStyle={{ fontSize: 10 }}
          xAxisLabelTextStyle={{ fontSize: 10 }}
          data2={data2}
          trimYAxisAtTop
          isAnimated
          yAxisOffset={roundedOffset}
          animationDuration={1000}
          initialSpacing={9}
          areaChart
          spacing={spacing}
          thickness={1.5}
          yAxisColor={"transparent"}
          xAxisColor={"transparent"}
          pointerConfig={{
            pointerComponent: () => {
              return (
                <View
                  style={{
                    borderWidth: 2,
                    height: 10,
                    width: 10,
                    borderColor: `${Colors.black}`,
                    borderRadius: 5,
                  }}
                />
              );
            },
            pointerStripUptoDataPoint: true,
            autoAdjustPointerLabelPosition: false,
            strokeDashArray: [10, 5],
            pointerLabelWidth: 120,

            pointerLabelComponent: (items: { value: any; label: any }[]) => {
              setSelectedDate(items[0].label);
              return (
                <View
                  style={{
                    width: "auto",
                    backgroundColor: Colors.black,
                    borderRadius: 4,
                    padding: 4,
                    justifyContent: "center",
                    paddingLeft: 16,
                    display: "flex",
                    flexDirection: "row",
                    columnGap: 5,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "lightgray", fontSize: 12 }}>
                    {items[0].label}
                  </Text>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {items[0].value.toFixed(0)}
                  </Text>
                  {data2 && (
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {items[1].value.toFixed(0)}
                    </Text>
                  )}
                </View>
              );
            },
          }}
          curvature={0.05}
          curved
          hideRules
          width={width}
          hideDataPoints
          color={color1}
          color2={color2}
          startFillColor={color1}
          startFillColor2={color2}
          startOpacity={0.8}
          endOpacity={0.3}
          endOpacity2={0.3}
        />
      </Pressable>
    </GestureDetector>
  );
};
