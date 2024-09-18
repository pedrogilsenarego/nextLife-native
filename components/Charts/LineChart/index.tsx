import React from "react";
import { Canvas, Path, Skia, Paint } from "@shopify/react-native-skia";
import { line, scaleLinear, scalePoint } from "d3";
import { Dimensions } from "react-native";
import Gradient from "./Gradient";
import { useSharedValue, withDelay, withTiming } from "react-native-reanimated";

type DataType = {
  label: string;
  value: number;
};

const LineChart = ({
  data,
  color,
  width,
  height,
  gradient = false, // Add a gradient prop
}: {
  data: DataType[];
  color: string;
  width?: number;
  height?: number;
  gradient?: boolean;
}) => {
  const CHART_MARGIN = 20;
  const CHART_WIDTH = width || Dimensions.get("screen").width - 2 * 18;
  const CHART_HEIGHT = height || 170;

  const xDomain = data.map((d) => d.label);
  const xRange = [CHART_MARGIN, CHART_WIDTH - CHART_MARGIN];
  const x = scalePoint().domain(xDomain).range(xRange).padding(0);
  const animationGradient = useSharedValue({ x: 0, y: 0 });
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const yRange = [CHART_HEIGHT + 10, -10];
  const y = scaleLinear().domain([min, max]).range(yRange);
  const curvedLine = line<DataType>()
    .x((d) => x(d.label)!)
    .y((d) => y(d.value))(data);

  // Convert the line path to Skia's path
  const linePath = Skia.Path.MakeFromSVGString(curvedLine!);

  animationGradient.value = withDelay(
    1000,
    withTiming({ x: 0, y: CHART_HEIGHT - 15 }, { duration: 500 })
  );

  return (
    <Canvas
      style={{
        height: CHART_HEIGHT,
        width: CHART_WIDTH,
      }}
    >
      <Path
        path={linePath!}
        style={"stroke"}
        strokeWidth={1.5}
        color={color}
        strokeCap={"round"}
      />
      {gradient && (
        <Gradient
          color={color}
          chartHeight={CHART_HEIGHT}
          chartWidth={CHART_WIDTH}
          chartMargin={CHART_MARGIN}
          curvedLine={curvedLine!}
          animationGradient={animationGradient}
        />
      )}
    </Canvas>
  );
};

export default LineChart;
