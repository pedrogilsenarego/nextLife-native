import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSharedValue, withTiming } from "react-native-reanimated";
import RenderItem from "./RenderItem";
import PieChart from "@/components/Charts/PieChart";
import { Colors, useTheme } from "@/providers/ThemeContext";
import useMetrics from "@/hooks/useMetrics";
import { Container } from "@/components/Atoms/Container";
type Data = {
  category: string;
  percentage: number;
  color: string;
  amount: number;
};

const PieChartMain = () => {
  const RADIUS = 60;
  const STROKE_WIDTH = 16;
  const OUTER_STROKE_WIDTH = 33;
  const GAP = 0.004;

  const [data, setData] = useState<Data[]>([]);

  const decimals = useSharedValue<number[]>([0.1, 0.1, 0.8]);

  const { getCategoriesPercentage } = useMetrics();

  const shadesOfGreen = [
    "#063b00", // (6,59,0)
    "#073f00", // Intermediate
    "#094400", // Intermediate
    "#0a5d00", // (10,93,0)
    "#0b6c00", // Intermediate
    "#0c7b00", // Intermediate
    "#089000", // (8,144,0)
    "#13b300", // Intermediate
    "#1fc600", // (31,198,0)
    "#0eff00", // (14,255,0)
  ];

  const shadesOfRed = [
    "#300000",
    "#7b0000",
    "#b10000",
    "#c80000",
    "#ff0000",
    "#ff3632",
    "#ff4f4b",
    "#ff817e",
    "#ffb3b2",
    "#ffcccb",
  ];

  useEffect(() => {
    generateData();
  }, []);

  const generateData = () => {
    const generateDecimals = getCategoriesPercentage().map(
      (category) => category.percentage / 100
    );

    decimals.value = [...generateDecimals];

    const arrayOfObjects = getCategoriesPercentage().map((value, index) => ({
      category: value.category,
      percentage: value.percentage,
      color: shadesOfRed[index],
      amount: value.amount,
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
          decimals={decimals}
          colors={shadesOfRed}
        />
      </View>
      <Container
        containerStyles={{
          display: "flex",
          flexDirection: "column",
          paddingHorizontal: 0,
          paddingVertical: 0,
          marginTop: 10,
        }}
      >
        {data.map((item, index) => {
          return <RenderItem item={item} key={index} index={index} />;
        })}
      </Container>
    </View>
  );
};

export default PieChartMain;
