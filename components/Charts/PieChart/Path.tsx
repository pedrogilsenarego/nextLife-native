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

const PiePath = ({
  radius,
  gap,
  strokeWidth,
  outerStrokeWidth,
  color,
  decimals,
  index,
}: Props) => {
  const innerRadius = radius - outerStrokeWidth / 2;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);
  const path2 = Skia.Path.Make();
  path2.addCircle(radius, radius, innerRadius + strokeWidth / 2 - 1);

  const start = useDerivedValue(() => {
    if (index === 0) {
      return gap;
    }
    const decimal = decimals.value.slice(0, index);

    const sum = decimal.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return withTiming(sum + gap, {
      duration: 1000,
    });
  }, []);
  const start2 = useDerivedValue(() => {
    if (index === 0) {
      return gap + 0.0039;
    }
    const decimal = decimals.value.slice(0, index);

    const sum = decimal.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return withTiming(sum + gap + 0.0039, {
      duration: 1000,
    });
  }, []);

  const end = useDerivedValue(() => {
    if (index === decimals.value.length - 1) {
      return withTiming(1, { duration: 1000 });
    }

    const decimal = decimals.value.slice(0, index + 1);

    const sum = decimal.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return withTiming(sum, {
      duration: 1000,
    });
  }, []);
  const end2 = useDerivedValue(() => {
    if (index === decimals.value.length - 1) {
      return withTiming(1 - 0.0039, { duration: 1000 });
    }

    const decimal = decimals.value.slice(0, index + 1);

    const sum = decimal.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return withTiming(sum - 0.0039, {
      duration: 1000,
    });
  }, []);

  return (
    <>
      <Path
        path={path2}
        color={"#18181B"}
        style="stroke"
        strokeCap="round"
        strokeWidth={4}
        start={start2}
        end={end2}
      ></Path>
      <Path
        path={path}
        color={"#18181B"}
        style="stroke"
        strokeWidth={strokeWidth - 0.5}
        start={start}
        end={end}
      >
        <BlurMask blur={0.06} style="normal" />
      </Path>
    </>
  );
};

export default PiePath;
