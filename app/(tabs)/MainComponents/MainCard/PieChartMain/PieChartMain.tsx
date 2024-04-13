import { useState } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSharedValue, withTiming } from "react-native-reanimated";
import RenderItem from "./RenderItem";
import PieChart from "@/components/Charts/PieChart";
import { useTheme } from "@/providers/ThemeContext";
type Data = {
  value: number;
  percentage: number;
  color: string;
};

const PieChartMain = () => {
  const RADIUS = 85;
  const STROKE_WIDTH = 35;
  const OUTER_STROKE_WIDTH = 50;
  const GAP = 0.01;
  const n = 5;
  const [data, setData] = useState<Data[]>([]);
  const { contrastColor } = useTheme();
  const decimals = useSharedValue<number[]>([]);
  const colors = [
    `${contrastColor}B3`,
    `${contrastColor}B3`,
    `${contrastColor}B3`,
    `${contrastColor}B3`,
    `${contrastColor}B3`,
  ];

  const generateData = () => {
    const generateNumbers = generateRandomNumbers(n);
    const total = generateNumbers.reduce(
      (acc, currentValue) => acc + currentValue,
      0
    );
    const generatePercentages = calculatePercentage(generateNumbers, total);
    const generateDecimals = generatePercentages.map(
      (number) => Number(number.toFixed(0)) / 100
    );

    decimals.value = [...generateDecimals];

    const arrayOfObjects = generateNumbers.map((value, index) => ({
      value,
      percentage: generatePercentages[index],
      color: colors[index],
    }));

    setData(arrayOfObjects);
  };

  function calculatePercentage(numbers: number[], total: number): number[] {
    const percentageArray: number[] = [];

    numbers.forEach((number) => {
      const percentage = Math.round((number / total) * 100);

      percentageArray.push(percentage);
    });

    return percentageArray;
  }
  function generateRandomNumbers(n: number): number[] {
    const min = 100;
    const max = 500;
    const result: number[] = [];

    for (let i = 0; i < n; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      result.push(randomNumber);
    }

    return result;
  }

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
        style={{ backgroundColor: "red", padding: 20, borderRadius: 10 }}
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
