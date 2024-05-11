import { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, Animated } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSharedValue, withTiming } from "react-native-reanimated";
import RenderItem from "./RenderItem";
import PieChart from "@/components/Charts/PieChart";
import { Colors, useTheme } from "@/providers/ThemeContext";
import useMetrics from "@/hooks/useMetrics";
import { Container } from "@/components/Atoms/Container";
import { ArrayButtons } from "@/components/Molecules/ArrayButtons";
import { RangeDataChoose } from "../../RangeDataChoose";
import { useApp } from "@/providers/AppProvider";
type Data = {
  category: string;
  percentage: number;
  color: string;
  amount: number;
};

const PieChartMain = () => {
  const RADIUS = 80;
  const STROKE_WIDTH = 16;
  const OUTER_STROKE_WIDTH = 33;
  const GAP = 0.004;
  const { dateRange } = useApp();
  const [data, setData] = useState<Data[] | null>(null);
  const [dataIncomes, setDataIncomes] = useState<Data[] | null>(null);
  const [mode, setMode] = useState<"expenses" | "incomes">("expenses");
  const dataToRender = mode === "expenses" ? data : dataIncomes;
  const decimalsExpenses = useSharedValue<number[]>([0.1, 0.1, 0.8, 0.2, 0.3]);
  const decimalsIncomes = useSharedValue<number[]>([0.1, 0.1, 0.8, 0.2, 0.3]);
  const opacityRef = useRef(new Animated.Value(0)).current;
  const opacityRef2 = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const scaleAnimIncomes = useRef(new Animated.Value(0)).current;
  const { getExpensesCategoriesPercentage, getIncomesCategoriesPercentage } =
    useMetrics();

  const shadesOfGreen = [
    "#300000",
    "#1f261a",
    "#3e4d34", // Intermediate
    "#094400", // Intermediate
    "#0a5d00", // (10,93,0)
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
    generateDataExpenses();
    generateDataIncomes();
  }, [dateRange]);

  const generateDataExpenses = () => {
    const rawData = getExpensesCategoriesPercentage();

    const generateDecimals = rawData.map(
      (category) => category.percentage / 100
    );

    decimalsExpenses.value = [...generateDecimals];

    const arrayOfObjects = rawData.map((value, index) => ({
      category: value.category,
      percentage: value.percentage,
      color: shadesOfRed[index],
      amount: value.amount,
    }));

    setData(arrayOfObjects);
  };

  const generateDataIncomes = () => {
    const rawData = getIncomesCategoriesPercentage();

    const generateDecimals = rawData.map(
      (category) => category.percentage / 100
    );

    decimalsIncomes.value = [...generateDecimals];

    const arrayOfObjects = rawData.map((value, index) => ({
      category: value.category,
      percentage: value.percentage,
      color: shadesOfGreen[index],
      amount: value.amount,
    }));

    setDataIncomes(arrayOfObjects);
  };

  const handleOnSelected = useCallback((selected: any) => {
    setMode(selected);
  }, []);

  useEffect(() => {
    animateScale2();
    animateScale();
    animateScaleIncomes();
  }, [mode]);

  const animateScale = () => {
    Animated.spring(scaleAnim, {
      toValue: mode === "expenses" ? 0 : 1,

      useNativeDriver: true,
    }).start();
  };
  const animateScaleIncomes = () => {
    Animated.spring(scaleAnimIncomes, {
      toValue: mode === "expenses" ? 0 : 1,

      useNativeDriver: true,
    }).start();
  };

  const animateScale2 = () => {
    Animated.spring(opacityRef, {
      toValue: mode === "expenses" ? 0 : 1,

      useNativeDriver: true,
    }).start();
    Animated.spring(opacityRef2, {
      toValue: mode === "expenses" ? 0 : 1,

      useNativeDriver: true,
    }).start();
  };

  const scaleInterpolate = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.3],
  });

  const scaleInterpolateIncomes = scaleAnimIncomes.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const opacityInterpolate = opacityRef.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.1],
  });

  const animatedStyle = {
    transform: [{ scale: scaleInterpolate }],
  };

  const animatedStyleIncomes = {
    transform: [{ scale: scaleInterpolateIncomes }],
  };

  const opacityInterpolate2 = opacityRef2.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 1],
  });

  return (
    <View style={{ position: "relative" }}>
      <Animated.View
        style={[
          animatedStyleIncomes,
          {
            position: "absolute",
            opacity: opacityInterpolate2,
            width: RADIUS * 2,
            height: RADIUS * 2,
            marginTop: 10,
          },
        ]}
      >
        <PieChart
          radius={RADIUS}
          gap={GAP}
          strokeWidth={STROKE_WIDTH}
          outerStrokeWidth={OUTER_STROKE_WIDTH}
          decimals={decimalsIncomes}
          colors={shadesOfGreen}
        />
      </Animated.View>
      <Animated.View
        style={[
          animatedStyle,
          {
            opacity: opacityInterpolate,
            width: RADIUS * 2,
            height: RADIUS * 2,
            marginTop: 10,
          },
        ]}
      >
        <PieChart
          radius={RADIUS}
          gap={GAP}
          strokeWidth={STROKE_WIDTH}
          outerStrokeWidth={OUTER_STROKE_WIDTH}
          decimals={decimalsExpenses}
          colors={shadesOfRed}
        />
      </Animated.View>
      <RangeDataChoose />
      <Container containerStyles={{ marginTop: 10 }}>
        <ArrayButtons
          buttons={["expenses", "incomes"]}
          onSelected={handleOnSelected}
        />
      </Container>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          paddingHorizontal: 0,
          paddingVertical: 0,
          marginTop: 10,
        }}
      >
        {dataToRender?.map((item, index) => {
          return item.percentage <= 0 ? null : (
            <RenderItem item={item} key={index} index={index} />
          );
        })}
      </View>
    </View>
  );
};

export default PieChartMain;
