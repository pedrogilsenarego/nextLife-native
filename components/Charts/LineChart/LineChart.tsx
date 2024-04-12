import React, { useEffect } from "react";

import { Canvas, Path, Rect, Skia } from "@shopify/react-native-skia";
import { curveBasis, line, scaleLinear, scalePoint } from "d3";
import { useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import Gradient from "./Gradient";
import XAxisText from "./XAxisText";

const LineChart = () => {
  type DataType = {
    label: string;
    date: string;
    value: number;
  };
  const CHART_WIDTH = 400;
  const CHART_HEIGHT = 400;
  const CHART_MARGIN = 20;
  const data: DataType[] = [
    { label: "Mon", date: "Monday", value: 12987 },
    { label: "Tue", date: "Tuesday", value: 14321 },
    { label: "Wed", date: "Wednesday", value: 13456 },
    { label: "Thu", date: "Thursday", value: 11876 },
    { label: "Fri", date: "Friday", value: 13789 },
    { label: "Sat", date: "Saturday", value: 12987 },
    { label: "Sun", date: "Sunday", value: 13234 },
  ];

  const animationLine = useSharedValue(0);
  const animationGradient = useSharedValue({ x: 0, y: 0 });

  useEffect(() => {
    // Animate the line and the gradient
    animationLine.value = withTiming(1, { duration: 1000 });
    animationGradient.value = withDelay(
      1000,
      withTiming({ x: 0, y: CHART_HEIGHT }, { duration: 500 })
    );
    //selectedValue.value = withTiming(totalValue);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const xDomain = data.map((dataPoint: DataType) => dataPoint.label);
  const xRange = [CHART_MARGIN, CHART_WIDTH - CHART_MARGIN];
  const x = scalePoint().domain(xDomain).range(xRange).padding(0);

  const max = Math.max(...data.map((val) => val.value));
  const min = Math.min(...data.map((val) => val.value));

  const yDomain = [min, max];
  const yRange = [CHART_HEIGHT, 0];
  const y = scaleLinear().domain(yDomain).range(yRange);

  const curvedLine = line<DataType>()
    .x((d) => x(d.label)!)
    .y((d) => y(d.value))
    .curve(curveBasis)(data);

  const linePath = Skia.Path.MakeFromSVGString(curvedLine!);

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
        strokeWidth={4}
        color="white"
        strokeCap={"round"}
        start={0}
        end={animationLine}
      />
      <Gradient
        chartHeight={CHART_HEIGHT}
        chartWidth={CHART_WIDTH}
        chartMargin={CHART_MARGIN}
        curvedLine={curvedLine!}
        animationGradient={animationGradient}
      />
      {data.map((dataPoint: DataType, index) => (
        <XAxisText
          x={x(dataPoint.label)!}
          y={CHART_HEIGHT}
          text={dataPoint.label}
          key={index}
        />
      ))}
    </Canvas>
  );
};

export default LineChart;
