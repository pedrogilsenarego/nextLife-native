import React from "react";
import { Text, useFont } from "@shopify/react-native-skia";
import {
  SharedValue,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  radius: number;
  decimals: SharedValue<number[]>;
  index: number;
};

const XAxisText = ({ radius, decimals, index }: Props) => {
  const angle = (2 * Math.PI) / decimals.value.length;
  const startAngle = index * angle;
  const endAngle = (index + 1) * angle;

  // Define the minimum and maximum percentage of the radius for the segment
  const minPercentage = 0.8; // Adjust as needed
  const maxPercentage = 0.8; // Adjust as needed

  // Calculate the segment radius within the specified range
  const segmentRadius =
    radius *
    (minPercentage + decimals.value[index] * (maxPercentage - minPercentage));

  const segmentCenterX =
    radius + segmentRadius * Math.cos(startAngle + (endAngle - startAngle) / 2);
  const segmentCenterY =
    radius + segmentRadius * Math.sin(startAngle + (endAngle - startAngle) / 2);

  // Get the percentage for the current segment
  const percentage = decimals.value[index] * 100;

  const xX = useDerivedValue(() => {
    return withTiming(segmentCenterX, {
      duration: 1000,
    });
  }, []);

  const yY = useDerivedValue(() => {
    return withTiming(segmentCenterY, {
      duration: 1000,
    });
  }, []);

  console.log(xX, yY, percentage);

  return (
    <Text
      font={null}
      x={xX}
      y={yY}
      text={`${percentage.toFixed(0)}%`}
      color={"green"}
    />
  );
};

export default XAxisText;
