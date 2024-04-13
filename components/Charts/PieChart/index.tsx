import { StyleSheet, View } from "react-native";
import React from "react";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { Canvas, Path, SkFont, Skia, Text } from "@shopify/react-native-skia";
import PiePath from "./Path";
import PathOut from "./PathOut";
import PathIn from "./PathIn";
import XAxisText from "./XAxisText";
import Ball from "./Ball";

type Props = {
  n: number;
  gap: number;
  radius: number;
  strokeWidth: number;
  outerStrokeWidth: number;
  decimals: SharedValue<number[]>;
  colors: string[];
};

const PieChart = ({
  n,
  gap,
  decimals,
  colors,

  strokeWidth,
  outerStrokeWidth,
  radius,
}: Props) => {
  const array = Array.from({ length: n });
  const innerRadius = radius - outerStrokeWidth / 2;
  const animatedText = useDerivedValue(() => {
    return `€`;
  });
  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Path
          path={path}
          color="#ffffff1A"
          style="stroke"
          strokeJoin="round"
          strokeWidth={outerStrokeWidth}
          strokeCap="round"
          start={0}
          end={1}
        />
        {array.map((_, index) => {
          return (
            <>
              <PathOut
                key={index + 20}
                radius={radius}
                strokeWidth={strokeWidth}
                outerStrokeWidth={outerStrokeWidth}
                color={colors[index]}
                decimals={decimals}
                index={index}
                gap={gap}
              />

              <PiePath
                key={index}
                radius={radius}
                strokeWidth={strokeWidth}
                outerStrokeWidth={outerStrokeWidth}
                color={colors[index]}
                decimals={decimals}
                index={index}
                gap={gap}
              />
              <Ball
                key={index + 80}
                radius={radius}
                strokeWidth={strokeWidth}
                outerStrokeWidth={outerStrokeWidth}
                color={colors[index]}
                decimals={decimals}
                index={index}
                gap={gap}
              />
              <PathIn
                key={index + 40}
                radius={radius}
                strokeWidth={strokeWidth}
                outerStrokeWidth={outerStrokeWidth}
                color={colors[index]}
                decimals={decimals}
                index={index}
                gap={gap}
              />
              {/* <XAxisText
                index={index}
                radius={radius}
                decimals={decimals}
                key={index + 60}
              /> */}
            </>
          );
        })}
      </Canvas>
    </View>
  );
};

export default PieChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
