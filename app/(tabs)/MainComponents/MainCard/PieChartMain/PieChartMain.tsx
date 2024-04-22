import { useState } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSharedValue, withTiming } from "react-native-reanimated";
import RenderItem from "./RenderItem";
import PieChart from "@/components/Charts/PieChart";
import { useTheme } from "@/providers/ThemeContext";
import useMetrics from "@/hooks/useMetrics";
type Data = {
  category: string;
  percentage: number;
  color: string;
};

const PieChartMain = () => {
  const RADIUS = 85;
  const STROKE_WIDTH = 28;
  const OUTER_STROKE_WIDTH = 33;
  const GAP = 0.07;
  const n = 3;
  const [data, setData] = useState<Data[]>([]);
  const { contrastColor, mainColor } = useTheme();
  const decimals = useSharedValue<number[]>([0.1, 0.1, 0.8]);

  const { getCategoriesPercentage } = useMetrics();

  const colors = [
    `${contrastColor}E6`,
    `${contrastColor}E6`,
    `${contrastColor}E6`,
    `${contrastColor}E6`,
    `${contrastColor}E6`,
  ];

  const generateData = () => {
    const generateDecimals = getCategoriesPercentage().map(
      (category) => category.percentage / 100
    );

    decimals.value = [...generateDecimals];

    const arrayOfObjects = getCategoriesPercentage().map((value, index) => ({
      category: value.category,
      percentage: value.percentage,
      color: colors[index],
    }));

    setData(arrayOfObjects);
  };

  return (
    <View>
      <View
        style={{
          width: RADIUS * 2,
          height: RADIUS * 2,
          marginTop: 10,
        }}
      >
        <PieChart
          radius={RADIUS}
          gap={GAP}
          strokeWidth={STROKE_WIDTH}
          outerStrokeWidth={OUTER_STROKE_WIDTH}
          n={n}
          decimals={decimals}
          colors={colors}
        />
      </View>
      <TouchableOpacity
        onPress={generateData}
        style={{ backgroundColor: mainColor, padding: 20, borderRadius: 10 }}
      >
        <Text style={{ color: "white" }}>dwq</Text>
      </TouchableOpacity>
      {data.map((item, index) => {
        return <RenderItem item={item} key={index} index={index} />;
      })}
    </View>
  );
};

export default PieChartMain;
