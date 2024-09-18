import React from "react";
import {
  Canvas,
  Path,
  Skia,
  Paint,
  Line,
  PaintStyle,
} from "@shopify/react-native-skia";
import {
  curveBasis,
  curveLinear,
  line,
  scaleLinear,
  scalePoint,
  style,
} from "d3";
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
  gradient = false,
  curveType = "linear",
  showAverage = false, // New prop to show the average line
}: {
  data: DataType[];
  color: string;
  width?: number;
  height?: number;
  gradient?: boolean;
  curveType?: "linear" | "cubic";
  showAverage?: boolean; // New prop
}) => {
  const CHART_MARGIN = 0;
  const CHART_WIDTH = width || Dimensions.get("screen").width - 2 * 18;
  const CHART_HEIGHT = height || 170;

  const xDomain = data.map((d) => d.label);
  const xRange = [CHART_MARGIN, CHART_WIDTH - CHART_MARGIN];

  const x = scalePoint().domain(xDomain).range(xRange).padding(0);

  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));

  const y = scaleLinear()
    .domain([min, max])
    .range([CHART_HEIGHT - CHART_MARGIN, CHART_MARGIN]);

  const selectedCurve = curveType === "cubic" ? curveBasis : curveLinear;

  const curvedLine = line<DataType>()
    .x((d) => x(d.label)!)
    .y((d) => y(d.value))
    .curve(selectedCurve)(data);

  const linePath = Skia.Path.MakeFromSVGString(curvedLine!);

  const averageValue = data.reduce((sum, d) => sum + d.value, 0) / data.length;

  const averageY = y(averageValue);

  const dashedPaint = Skia.Paint();
  dashedPaint.setColor(Skia.Color(color));
  dashedPaint.setStyle(PaintStyle.Stroke);
  dashedPaint.setStrokeWidth(1);
  dashedPaint.setPathEffect(Skia.PathEffect.MakeDash([4, 4], 0));

  const animationGradient = useSharedValue({ x: 0, y: 0 });
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
        strokeWidth={2}
        color={color}
        strokeCap={"round"}
      />

      {showAverage && (
        <Line
          p1={{ x: CHART_MARGIN, y: averageY }}
          p2={{ x: CHART_WIDTH - CHART_MARGIN, y: averageY }}
          paint={dashedPaint}
        />
      )}

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
