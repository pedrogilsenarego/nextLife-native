import { useRef } from "react";
import { Dimensions, View } from "react-native";
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
  const width = Dimensions.get("window").width - 12;

  const minDataValue = Math.min(
    ...data.map((item) => item.value),
    ...(data2 ? data2.map((item) => item.value) : [])
  );

  // Round down the minimum value to the nearest multiple of 1000
  const roundedOffset = Math.floor(minDataValue / 1000) * 1000;
  const spacing = (width - 65) / (data.length - 1);

  return (
    <LineChart
      data={data}
      yAxisTextStyle={{ fontSize: 10 }}
      xAxisLabelTextStyle={{ fontSize: 10 }}
      data2={data2}
      trimYAxisAtTop
      isAnimated
      yAxisOffset={roundedOffset}
      animationDuration={1000}
      initialSpacing={3}
      areaChart
      spacing={spacing}
      thickness={1.5}
      yAxisColor={"transparent"}
      xAxisColor={"transparent"}
      pointerConfig={{}}
      //curved
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
  );
};
