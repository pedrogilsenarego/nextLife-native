import { StyleSheet, View } from "react-native";
import React from "react";
import { SharedValue } from "react-native-reanimated";
import { Canvas, Skia } from "@shopify/react-native-skia";
import PiePath from "./Path";

type Props = {
  gap: number;
  radius: number;
  strokeWidth: number;
  outerStrokeWidth: number;
  decimals: SharedValue<number[]>;
  colors: string[];
};

const PieChart = ({
  gap,
  decimals,
  colors,

  strokeWidth,
  outerStrokeWidth,
  radius,
}: Props) => {
  const innerRadius = radius - outerStrokeWidth / 2;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        {decimals.value.map((_, index) => {
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
