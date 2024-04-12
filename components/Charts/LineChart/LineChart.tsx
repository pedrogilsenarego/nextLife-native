import React, { useEffect, useState } from "react";

import { Canvas, Path, Rect, Skia } from "@shopify/react-native-skia";
import { curveBasis, line, scaleLinear, scalePoint } from "d3";
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
type DataType = {
  label: string;
  value: number;
};
const LineChart = ({
  setSelectedDate,
  selectedValue,
  data,
}: {
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  selectedValue: SharedValue<number>;
  data: DataType[];
}) => {
  const CHART_WIDTH = 200;
  const CHART_HEIGHT = 200;
  const CHART_MARGIN = 20;

  const [showCursor, setShowCursor] = useState(false);

  const animationLine = useSharedValue(0);
  const animationGradient = useSharedValue({ x: 0, y: 0 });
  const cx = useSharedValue(20);
  const cy = useSharedValue(0);
  const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);

  useEffect(() => {
    // Animate the line and the gradient
    animationLine.value = withTiming(1, { duration: 1000 });
    animationGradient.value = withDelay(
      1000,
      withTiming({ x: 0, y: CHART_HEIGHT }, { duration: 500 })
    );
    selectedValue.value = withTiming(totalValue);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const xDomain = data.map((dataPoint: DataType) => dataPoint.label);
  const xRange = [CHART_MARGIN, CHART_WIDTH - CHART_MARGIN];
  const x = scalePoint().domain(xDomain).range(xRange).padding(0);

  const stepX = x.step();

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

  const path = parse(linePath!.toSVGString());

  const handleGestureEvent = (e: PanGestureHandlerEventPayload) => {
    "worklet";

    const index = Math.floor(e.absoluteX / stepX);
    runOnJS(setSelectedDate)(data[index].label);
    selectedValue.value = withTiming(data[index].value);

    const clampValue = clamp(
      Math.floor(e.absoluteX / stepX) * stepX + CHART_MARGIN,
      CHART_MARGIN,
      CHART_WIDTH - CHART_MARGIN
    );

    cx.value = clampValue;

    cy.value = getYForX(path, Math.floor(clampValue))!;
  };

  const pan = Gesture.Pan()
    .onTouchesDown(() => {
      runOnJS(setShowCursor)(true);
    })
    .onTouchesUp(() => {
      runOnJS(setShowCursor)(false);
      selectedValue.value = withTiming(totalValue);
      runOnJS(setSelectedDate)("Total");
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
        <Cursor
          cx={cx}
          cy={cy}
          chartHeight={CHART_HEIGHT}
          showCursor={showCursor}
        />
      </Canvas>
    </GestureDetector>
  );
};

export default LineChart;
