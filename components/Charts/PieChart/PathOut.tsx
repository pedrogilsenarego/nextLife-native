import React from "react";
import { Path, Skia } from "@shopify/react-native-skia";
import {
  SharedValue,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  strokeWidth: number;
  outerStrokeWidth: number;
  gap: number;
  radius: number;
  color: string;
  decimals: SharedValue<number[]>;
  index: number;
};

const PathOut = ({
  radius,
  gap,

  outerStrokeWidth,

  decimals,
  index,
}: Props) => {
  const innerRadius = radius - outerStrokeWidth / 2;
  const gapAdjustment = 0.004;
  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius + outerStrokeWidth / 2 - 4);

  const start = useDerivedValue(() => {
    if (index === 0) {
      return gap + gapAdjustment;
    }
    const decimal = decimals.value.slice(0, index);

    const sum = decimal.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return withTiming(sum + gap + gapAdjustment, {
      duration: 1000,
    });
  }, []);

  const end = useDerivedValue(() => {
    if (index === decimals.value.length - 1) {
      return withTiming(1 - gapAdjustment, { duration: 1000 });
    }

    const decimal = decimals.value.slice(0, index + 1);

    const sum = decimal.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return withTiming(sum - gapAdjustment, {
      duration: 1000,
    });
  }, []);

  return (
    <Path
      path={path}
      color={"#ffffff66"}
      style="stroke"
      strokeCap="round"
      strokeWidth={5}
      start={start}
      end={end}
    />
  );
};

export default PathOut;
