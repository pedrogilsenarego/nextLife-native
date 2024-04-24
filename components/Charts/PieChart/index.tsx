import { StyleSheet, View } from "react-native";
import React from "react";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { Canvas, Path, SkFont, Skia, Text } from "@shopify/react-native-skia";
import PiePath from "./Path";

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
        {array.map((_, index) => {
          return (
            <>
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
