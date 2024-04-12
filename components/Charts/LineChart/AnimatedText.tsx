import { useWindowDimensions } from "react-native";
import React from "react";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { Canvas, SkFont, Text } from "@shopify/react-native-skia";

type Props = {
  selectedValue: SharedValue<number>;
  font: SkFont;
};

const AnimatedText = ({ selectedValue, font }: Props) => {
  const { width } = useWindowDimensions();
  const MARGIN_VERTICAL = 0;

  const animatedText = useDerivedValue(() => {
    return `€${Math.round(selectedValue.value)}`;
  });

  const fontSize = font?.measureText("0");

  const textX = useDerivedValue(() => {
    const _fontSize = font?.measureText(animatedText.value);
    return width / 2 - _fontSize!.width / 2;
  }, []);

  return (
    <Canvas style={{ height: fontSize!.height + MARGIN_VERTICAL }}>
      <Text
        text={animatedText}
        font={null}
        color={"white"}
        x={0}
        y={fontSize!.height + MARGIN_VERTICAL / 2}
      />
    </Canvas>
  );
};

export default AnimatedText;
