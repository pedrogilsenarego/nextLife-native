import { useApp } from "@/providers/AppProvider";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { useEffect, useState } from "react";

import { Dimensions, View, Text, Pressable } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { LineChart } from "react-native-gifted-charts";

type DataType = {
  label: string;
  value: number;
};

type Props = {
  data: DataType[];
  data2?: DataType[];
  color1: string;
  color2?: string;
};

export const LineChartGifted = ({ data, data2, color1, color2 }: Props) => {
  const { theme } = useTheme();
  const { changeSelectedDate } = useApp();
  const width = Dimensions.get("window").width - 12;
  const defaultPointerColor = theme === "light" ? Colors.black : "whitesmoke";
  const [pointerColor, setPointerColor] = useState(defaultPointerColor);
  useEffect(() => {
    if (pointerColor === "transparent") changeSelectedDate("Total");
    setPointerColor("transparent");
  }, [data]);

  const minDataValue = Math.min(
    ...data.map((item) => item.value),
    ...(data2 ? data2.map((item) => item.value) : [])
  );

  // Round down the minimum value to the nearest multiple of 1000
  const roundedOffset = Math.floor(minDataValue / 1000) * 1000;

  const pan = Gesture.Pan();

  return (
    <GestureDetector gesture={pan}>
      <Pressable style={{ position: "relative" }}>
        <LineChart
          data={data}
          yAxisTextStyle={{
            fontSize: 10,
            color: theme === "light" ? "black" : "white",
          }}
          xAxisLabelTextStyle={{
            fontSize: 10,
            color: theme === "light" ? "black" : "white",
          }}
          data2={data2}
          trimYAxisAtTop
          isAnimated
          yAxisOffset={roundedOffset}
          // animationDuration={1000}
          initialSpacing={9}
          areaChart
          spacing={(width - 75) / (data.length - 1 === 0 ? 1 : data.length - 1)}
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
                    borderColor: pointerColor,
                    borderRadius: 5,
                  }}
                />
              );
            },
            persistPointer: true,

            pointerStripColor: pointerColor,
            pointerStripUptoDataPoint: true,
            autoAdjustPointerLabelPosition: false,
            strokeDashArray: [10, 5],
            pointerLabelWidth: 120,

            pointerLabelComponent: (items: { value: any; label: any }[]) => {
              changeSelectedDate(items[0].label);
              setPointerColor(defaultPointerColor);
              return <></>;
            },
          }}
          curvature={0}
          curved
          hideRules
          width={width}
          hideDataPoints
          color={color1}
          color2={color2}
          startFillColor={color1}
          startFillColor2={color2}
          startOpacity={theme === "dark" ? 0.4 : 0.8}
          startOpacity2={theme === "dark" ? 0.4 : 0.8}
          endOpacity={0}
          endOpacity2={0}
        />
      </Pressable>
    </GestureDetector>
  );
};
