import React from "react";
import { Text, useFont } from "@shopify/react-native-skia";
import { useTheme } from "@/providers/ThemeContext";

type Props = {
  x: number;
  y: number;
  text: string;
  color: string;
};

const XAxisText = ({ x, y, text, color }: Props) => {
  //   const font = useFont(
  //     require("../../../assets/fonts/SpaceMono-Regular.ttf"),
  //     18
  //   );

  //   if (!font) {
  //     return null;
  //   }

  //   const fontSize = font.measureText(text);

  return (
    <Text
      font={null}
      //x={x - fontSize.width / 2}

      x={x - 8}
      y={y - 15}
      text={text}
      color={color}
    />
  );
};

export default XAxisText;
