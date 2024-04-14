import React from "react";
import {
  BlurMask,
  CornerPathEffect,
  Path,
  Text,
  Skia,
} from "@shopify/react-native-skia";
import {
  SharedValue,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { style } from "d3";

type Props = {
  strokeWidth: number;
  outerStrokeWidth: number;
  gap: number;
  radius: number;
  color: string;
  decimals: SharedValue<number[]>;
  index: number;
};

const Ball = ({
  radius,
  gap,
  strokeWidth,
  outerStrokeWidth,
  color,
  decimals,
  index,
}: Props) => {
  const colors = ["red", "green", "blue", "yellow", "gray", "red"];
  const innerRadius = radius - outerStrokeWidth / 2;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const start = useDerivedValue(() => {
    if (index === 0) {
      return gap + 0.003;
    }
    const decimal = decimals.value.slice(0, index);

    const sum = decimal.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return withTiming(sum + gap + 0.003, {
      duration: 1000,
    });
  }, []);

  const end = useDerivedValue(() => {
    if (index === 0) {
      return gap + 0.006;
    }
    const decimal = decimals.value.slice(0, index);

    const sum = decimal.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return withTiming(sum + gap + 0.006, {
      duration: 1000,
    });
  }, []);

  return (
    <>
      <Path
        path={path}
        color={colors[index]}
        style="stroke"
        strokeJoin="round"
        strokeCap="round"
        strokeWidth={18}
        start={start}
        end={end}
      />
    </>
  );
};

export default Ball;
