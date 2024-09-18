import React from "react";
import {
  Canvas,
  Path,
  Skia,
  Paint,
  Line,
  PaintStyle,
} from "@shopify/react-native-skia";
import { curveBasis, curveLinear, line, scaleLinear, scalePoint } from "d3";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import Gradient from "./Gradient";
import { useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { Colors } from "@/providers/ThemeContext";

type DataType = {
  label: string;
  value: number;
};

const LineChart = ({
  data,
  color = "black",
  width,
  height,
  gradient = false,
  curveType = "linear",
  gridYStep = 3,
  showAverage = false, // New prop to show the average line
}: {
  data: DataType[];
  color?: string;
  width?: number;
  height?: number;
  gridYStep?: number;
  gradient?: boolean;
  curveType?: "linear" | "cubic";
  showAverage?: boolean; // New prop
}) => {
  const CHART_MARGIN = 0;
  const CHART_WIDTH = width || Dimensions.get("screen").width - 2 * 18;
  const CHART_HEIGHT = height || 170;
  const LABEL_HEIGHT = 20; // Space for labels

  const xDomain = data.map((d) => d.label);
  const xRange = [CHART_MARGIN, CHART_WIDTH - CHART_MARGIN];

  const x = scalePoint().domain(xDomain).range(xRange).padding(0);

  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));

  // Create a Y scale starting from 0 for better grid alignment
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
  dashedPaint.setColor(Skia.Color(Colors.lightGray));
  dashedPaint.setStyle(PaintStyle.Stroke);
  dashedPaint.setStrokeWidth(0.5);
  dashedPaint.setPathEffect(Skia.PathEffect.MakeDash([4, 4], 0));

  const dashedPaintAvg = Skia.Paint();
  dashedPaintAvg.setColor(Skia.Color(Colors.gray));
  dashedPaintAvg.setStyle(PaintStyle.Stroke);
  dashedPaintAvg.setStrokeWidth(1);
  dashedPaintAvg.setPathEffect(Skia.PathEffect.MakeDash([4, 4], 0));

  const animationGradient = useSharedValue({ x: 0, y: 0 });
  animationGradient.value = withDelay(
    1000,
    withTiming({ x: 0, y: CHART_HEIGHT }, { duration: 500 })
  );

  const renderGridLines = () => {
    const lines = [];
    const stepSize = (max - min) / gridYStep;
    for (let i = 0; i <= gridYStep; i++) {
      const value = min + i * stepSize;
      const yValue = y(value);
      lines.push(
        <Line
          key={i}
          p1={{ x: CHART_MARGIN, y: yValue }}
          p2={{ x: CHART_WIDTH - CHART_MARGIN, y: yValue }}
          paint={dashedPaint}
        />
      );
    }
    return lines;
  };

  return (
    <View>
      <Canvas
        style={{
          height: CHART_HEIGHT,
          width: CHART_WIDTH,
        }}
      >
        {renderGridLines()}

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
            paint={dashedPaintAvg}
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

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: CHART_WIDTH,
          marginTop: 10,
          height: LABEL_HEIGHT,
        }}
      >
        {xDomain.map((label, index) => (
          <Text key={index} style={styles.label} numberOfLines={1}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
  },
});

export default LineChart;
