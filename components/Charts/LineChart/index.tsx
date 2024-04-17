import React, { useEffect, useState } from "react";

import { Canvas, Path, Rect, Skia } from "@shopify/react-native-skia";
import {
  curveBasis,
  curveBundle,
  curveCardinal,
  curveLinear,
  curveMonotoneX,
  curveNatural,
  curveStep,
  curveStepAfter,
  line,
  scaleLinear,
  scalePoint,
} from "d3";
import {
  SharedValue,
  clamp,
  runOnJS,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import Gradient from "./Gradient";
import XAxisText from "./XAxisText";
import Cursor from "./Cursor";
import {
  Gesture,
  GestureDetector,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { getYForX, parse } from "react-native-redash";
import { Dimensions } from "react-native";
import { Colors, useTheme } from "@/providers/ThemeContext";
type DataType = {
  label: string;
  value: number;
};
const LineChart = ({
  setSelectedDate,
  selectedValue,
  selectedDate,

  accValue,
  data,
  data2,
  color1,
  color2,
}: {
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  selectedValue: SharedValue<number>;
  accValue: SharedValue<number>;

  data: DataType[];
  data2?: DataType[];
  color1: string;
  color2?: string;
  selectedDate: string;
}) => {
  const CHART_MARGIN = 20;
  const CHART_WIDTH = Dimensions.get("screen").width - 2 * 18;
  const CHART_HEIGHT = 170;

  const [showCursor, setShowCursor] = useState(false);

  const animationLine = useSharedValue(0);
  const animationLine2 = useSharedValue(0);
  const animationGradient = useSharedValue({ x: 0, y: 0 });
  const animationGradient2 = useSharedValue({ x: 0, y: 0 });
  const cx = useSharedValue(CHART_MARGIN);
  const cy = useSharedValue(CHART_HEIGHT - data[0].value - 10);
  const cy2 = data2
    ? useSharedValue(CHART_HEIGHT - data2[0].value - 10)
    : useSharedValue(0);

  useEffect(() => {
    // Animate the line and the gradient
    animationLine.value = withTiming(1, { duration: 1000 });
    animationLine2.value = withTiming(1, { duration: 1000 });
    animationGradient.value = withDelay(
      1000,
      withTiming({ x: 0, y: CHART_HEIGHT - 15 }, { duration: 500 })
    );
    animationGradient2.value = withDelay(
      1000,
      withTiming({ x: 0, y: CHART_HEIGHT - 15 }, { duration: 500 })
    );

    selectedValue.value = withTiming(data[0].value);
    accValue.value = withTiming(data[0].value);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const xDomain = data.map((dataPoint: DataType) => dataPoint.label);
  const x2Domain = data2
    ? data2.map((dataPoint: DataType) => dataPoint.label)
    : xDomain;
  const xRange = [CHART_MARGIN, CHART_WIDTH - CHART_MARGIN];
  const x = scalePoint().domain(xDomain).range(xRange).padding(0);
  const x2 = scalePoint().domain(x2Domain).range(xRange).padding(0);

  const stepX = x.step();

  const max = Math.max(...data.map((val) => val.value));
  const max2 = data2 ? Math.max(...data2.map((val) => val.value)) : max;
  const min = Math.min(...data.map((val) => val.value));
  const min2 = data2 ? Math.min(...data2.map((val) => val.value)) : min;

  const yDomain = [min, max];
  const y2Domain = data2 ? [min2, max2] : [min, max];
  const yRange = [CHART_HEIGHT - 35, -25];
  const y = scaleLinear().domain(yDomain).range(yRange);
  const y2 = data2 ? scaleLinear().domain(y2Domain).range(yRange) : null;
  //curveStep
  //curveBasis
  //curveLinear
  const curvedLine = line<DataType>()
    .x((d) => x(d.label)!)
    .y((d) => y(d.value))
    .curve(curveBasis)(data);

  const curvedLine2 =
    data2 && y2
      ? line<DataType>()
          .x((d) => x2(d.label)!)
          .y((d) => y2(d.value))
          .curve(curveBasis)(data2)
      : null;

  const linePath = Skia.Path.MakeFromSVGString(curvedLine!);
  const linePath2 = curvedLine2
    ? Skia.Path.MakeFromSVGString(curvedLine2!)
    : null;

  const path = parse(linePath!.toSVGString());
  const path2 = data2 ? parse(linePath2!.toSVGString()) : null;

  const handleGestureEvent = (e: PanGestureHandlerEventPayload) => {
    "worklet";

    const index = Math.floor(e.absoluteX / stepX);
    const sum = data
      .slice(0, index + 1)
      .reduce((total, item) => total + item.value, 0);

    runOnJS(setSelectedDate)(data[index].label);
    selectedValue.value = withTiming(data[index].value);
    accValue.value = withTiming(sum);

    const clampValue = clamp(
      Math.floor(e.absoluteX / stepX) * stepX + CHART_MARGIN,
      CHART_MARGIN,
      CHART_WIDTH - CHART_MARGIN
    );

    cx.value = clampValue;

    cy.value = getYForX(path, Math.floor(clampValue))!;
    if (data2 && path2) cy2.value = getYForX(path2, Math.floor(clampValue))!;
  };

  const pan = Gesture.Pan()
    .onTouchesDown(() => {
      runOnJS(setShowCursor)(true);
    })
    .onTouchesUp(() => {
      runOnJS(setShowCursor)(false);
      //selectedValue.value = withTiming(totalValue);
      //runOnJS(setSelectedDate)("Total");
    })
    .onBegin(handleGestureEvent)
    .onChange(handleGestureEvent);

  return (
    <GestureDetector gesture={pan}>
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
          color={color1}
          strokeCap={"round"}
          start={0}
          end={animationLine}
        />
        {data2 && (
          <Path
            path={linePath2!}
            style={"stroke"}
            strokeWidth={2}
            color={color2 || ""}
            strokeCap={"round"}
            start={0}
            end={animationLine2}
          />
        )}
        <Gradient
          color={color1}
          chartHeight={CHART_HEIGHT}
          chartWidth={CHART_WIDTH}
          chartMargin={CHART_MARGIN}
          curvedLine={curvedLine!}
          animationGradient={animationGradient}
        />
        {data2 && (
          <Gradient
            color={color2 || ""}
            chartHeight={CHART_HEIGHT}
            chartWidth={CHART_WIDTH}
            chartMargin={CHART_MARGIN}
            curvedLine={curvedLine2!}
            animationGradient={animationGradient2}
          />
        )}
        {data.map((dataPoint: DataType, index) => (
          <XAxisText
            x={x(dataPoint.label)!}
            y={CHART_HEIGHT}
            text={dataPoint.label}
            key={index}
          />
        ))}
        {selectedDate !== "Total" && (
          <Cursor
            color={color1}
            cx={cx}
            cy={cy}
            chartHeight={CHART_HEIGHT}
            showCursor={showCursor}
          />
        )}
        {selectedDate !== "Total" && data2 && cy2 && (
          <Cursor
            color={color2 || ""}
            cx={cx}
            cy={cy2}
            chartHeight={CHART_HEIGHT}
            showCursor={showCursor}
          />
        )}
      </Canvas>
    </GestureDetector>
  );
};

export default LineChart;
