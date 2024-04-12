import { LinearGradient, Path, Skia } from "@shopify/react-native-skia";
import { SharedValue } from "react-native-reanimated";

type Props = {
  chartHeight: number;
  chartWidth: number;
  chartMargin: number;
  curvedLine: string;
  animationGradient: SharedValue<{ x: number; y: number }>;
};
const Gradient = ({
  chartHeight,
  chartWidth,
  chartMargin,
  curvedLine,
  animationGradient,
}: Props) => {
  const getGradientArea = (
    chartLine: string,
    width: number,
    height: number
  ) => {
    const gradientAreaSplit = Skia.Path.MakeFromSVGString(chartLine);

    if (gradientAreaSplit) {
      gradientAreaSplit

        .lineTo(width - chartMargin, height)

        .lineTo(chartMargin, height)

        .lineTo(chartMargin, gradientAreaSplit.getPoint(0).y);
    }

    return gradientAreaSplit;
  };
  return (
    <Path
      path={getGradientArea(curvedLine!, chartWidth, chartHeight)!}
      color={"pink"}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={animationGradient}
        colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0)"]}
      />
    </Path>
  );
};

export default Gradient;
