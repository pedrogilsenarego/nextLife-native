import { useWindowDimensions } from "react-native";
import React from "react";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { Canvas, SkFont, Text } from "@shopify/react-native-skia";

type Props = {
  selectedValue: SharedValue<number>;
  font: SkFont;
  color?: string;
};

const AnimatedText = ({ selectedValue, font, color }: Props) => {
  const animatedText = useDerivedValue(() => {
    return `${Math.round(selectedValue.value)}€`;
  });

  const fontSize = font?.measureText("0");

  return (
    <Canvas
      style={{
        backgroundColor: "blue",
        height: 25,
        width: 30,
      }}
    >
      <Text
        text={animatedText}
        font={font}
        color={color || "white"}
        x={0}
        y={fontSize!.height + 9}
      />
    </Canvas>
  );
};

export default AnimatedText;
