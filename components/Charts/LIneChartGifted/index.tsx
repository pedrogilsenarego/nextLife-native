import { Dimensions } from "react-native";
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

  return (
    <LineChart
      data={data}
      data2={data2}
      isAnimated
      animationDuration={1000}
      areaChart
      spacing={(width - 70) / data.length}
      thickness={1}
      yAxisColor={"transparent"}
      xAxisColor={"transparent"}
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
