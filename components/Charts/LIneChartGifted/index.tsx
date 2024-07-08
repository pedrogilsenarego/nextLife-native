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
  avg?: boolean;
};

export const LineChartGifted = ({
  data,
  data2,
  color1,
  color2,
  avg = true,
}: Props) => {
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

  const roundedOffset = Math.floor(minDataValue / 1000) * 1000;

  const pan = Gesture.Pan();

  const averageValue1 =
    avg && data
      ? data.reduce((acc, item) => acc + item.value, 0) / data.length
      : null;
  const averageValue2 =
    avg && data2
      ? data2.reduce((acc, item) => acc + item.value, 0) / data.length
      : null;

  const data3 = data.map((item) => ({
    label: item.label,
    value: averageValue1 || 0, // Ensure value is a number
  }));

  const data4 = data2?.map((item) => ({
    label: item.label,
    value: averageValue2 || 0, // Ensure value is a number
  }));

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
          data3={data3}
          data4={data4}
          trimYAxisAtTop
          isAnimated
          yAxisOffset={roundedOffset}
          // animationDuration={1000}
          initialSpacing={9}
          areaChart
          spacing={(width - 75) / (data.length - 1 === 0 ? 1 : data.length - 1)}
          thickness={1.5}
          thickness3={1}
          thickness4={1}
          yAxisColor={"transparent"}
          xAxisColor={"transparent"}
          pointerConfig={{
            hidePointer3: true,
            hidePointer4: true,
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
          strokeDashArray3={[2, 2]}
          strokeDashArray4={[2, 2]}
          width={width}
          hideDataPoints
          color={color1}
          color2={color2}
          color3={`${color1}40`}
          color4={color2 ? `${color2}40` : undefined}
          startFillColor={color1}
          startFillColor2={color2}
          startFillColor3="transparent"
          startFillColor4="transparent"
          startOpacity={theme === "dark" ? 0.4 : 0.8}
          startOpacity2={theme === "dark" ? 0.4 : 0.8}
          startOpacity3={0}
          startOpacity4={0}
          endOpacity={0}
          endOpacity2={0}
        />
      </Pressable>
    </GestureDetector>
  );
};
