import React from "react";
import { Circle, Group, Path, Skia } from "@shopify/react-native-skia";
import { SharedValue, useDerivedValue } from "react-native-reanimated";

type Props = {
  cx: SharedValue<number>;
  cy: SharedValue<number>;
  chartHeight: number;
  showCursor: boolean;
  color: string;
};

const Cursor = ({ cx, cy, chartHeight, showCursor, color }: Props) => {
  const path = useDerivedValue(() => {
    const dottedLine = Skia.Path.Make().lineTo(0, chartHeight - cy.value - 20);
    dottedLine.dash(10, 10, 0);

    const matrix = Skia.Matrix();
    matrix.translate(cx.value, cy.value);
    dottedLine.transform(matrix);

    return dottedLine;
  });

  return (
    <Group>
      <Path
        path={path}
        opacity={showCursor ? 1 : 0.6}
        color={color}
        style="stroke"
        strokeJoin="round"
        strokeWidth={1}
      />
      <Circle
        opacity={showCursor ? 1 : 0.6}
        r={6}
        cx={cx}
        cy={cy}
        strokeWidth={3}
        color={color}
        style={"stroke"}
      />
    </Group>
  );
};

export default Cursor;
