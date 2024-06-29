import { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, Animated, Pressable } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import RenderItem from "./RenderItem";
import PieChart from "@/components/Charts/PieChart";
import { Colors, useTheme } from "@/providers/ThemeContext";
import useMetrics from "@/hooks/useMetrics";
import { Container } from "@/components/Atoms/Container";
import { ArrayButtons } from "@/components/Molecules/ArrayButtons";
import { RangeDataChoose } from "../../../../../components/Molecules/RangeDataChoose";
import { useApp } from "@/providers/AppProvider";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import LoaderSpinner from "@/components/Atoms/LoaderSpinner";

type Data = {
  category: string;
  percentage: number;
  color: string;
  amount: number;
};

type Props = {
  businessSelected?: string;
};

const PieChartMain = ({ businessSelected }: Props) => {
  const RADIUS = 90;
  const STROKE_WIDTH = 17;
  const OUTER_STROKE_WIDTH = 33;
  const GAP = 0.004;
  const { dateRange } = useApp();
  const { theme } = useTheme();
  const expenses = useExpenses();
  const incomes = useIncomes();
  const [dataExpenses, setDataExpenses] = useState<Data[] | null>(null);
  const [dataIncomes, setDataIncomes] = useState<Data[] | null>(null);
  const [mode, setMode] = useState<"expenses" | "incomes">("expenses");
  const dataToRender = mode === "expenses" ? dataExpenses : dataIncomes;
  const decimalsExpenses = useSharedValue<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const decimalsIncomes = useSharedValue<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const opacityRef = useRef(new Animated.Value(0)).current;
  const opacityRef2 = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const scaleAnimIncomes = useRef(new Animated.Value(0)).current;
  const {
    getExpensesCategoriesPercentage,
    getIncomesCategoriesPercentage,
    getNumberOfDifferentMonths,
  } = useMetrics({ businessSelected });

  const shadesOfGreen = [
    "#1f261a",
    "#3e4d34",
    "#11823b",
    "#48bf53",
    "#04e404",
    "#61f161",
    "#a0f0a0",
    "#d8f8d8",
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
    "#ffcccb66",
  ];

  const numberOfMonths =
    expenses?.isLoading ||
    incomes?.isLoading ||
    dateRange === "currentMonth" ||
    dateRange === "lastLastMonth" ||
    dateRange === "lastMonth"
      ? 1
      : getNumberOfDifferentMonths();

  useEffect(() => {
    if (!expenses.isLoading && !incomes.isLoading) {
      generateDataExpenses();
      generateDataIncomes();
    }
  }, [dateRange, expenses.isLoading, incomes.isLoading]);

  const generateDataExpenses = () => {
    const rawData = getExpensesCategoriesPercentage();

    const generateDecimals = rawData?.map(
      (category) => category?.percentage / 100
    );

    decimalsExpenses.value = [
      ...generateDecimals,
      ...new Array(15 - generateDecimals.length).fill(0).slice(0, 15),
    ];

    const arrayOfObjects = rawData?.map((value, index) => ({
      category: value?.category,
      percentage: value?.percentage,
      color: shadesOfRed[index],
      amount: value?.amount,
    }));

    setDataExpenses(arrayOfObjects);
  };

  const generateDataIncomes = () => {
    const rawData = getIncomesCategoriesPercentage();

    const generateDecimals = rawData.map(
      (category) => category.percentage / 100
    );

    decimalsIncomes.value = [
      ...generateDecimals,
      ...new Array(10 - generateDecimals.length).fill(0),
    ].slice(0, 10);

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
    outputRange: [1, 0.4],
  });

  const scaleInterpolateIncomes = scaleAnimIncomes.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
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
    <Pressable>
      <View>
        {expenses.isLoading || incomes.isLoading ? (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 233,
              width: "100%",
            }}
          >
            <LoaderSpinner
              color={theme === "light" ? Colors.black : Colors.white}
            />
          </View>
        ) : (
          <View style={{ position: "relative" }}>
            <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
              <View style={{ height: 233, justifyContent: "center" }}>
                <Animated.View
                  style={[
                    animatedStyleIncomes,
                    {
                      position: "absolute",
                      opacity: opacityInterpolate2,
                      width: RADIUS * 2,
                      height: RADIUS * 2,
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
              </View>
              <View
                style={{
                  alignItems: "flex-end",
                  justifyContent: "space-evenly",
                  width: "auto",

                  flex: 1,
                  rowGap: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 12,
                    color: theme === "light" ? "black" : "whitesmoke",
                  }}
                >
                  did you know that this month you spend more than usual at
                  groceries?
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 12,
                    color: theme === "light" ? "black" : "whitesmoke",
                  }}
                >
                  in average your car is more expensive than your travels
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 12,
                    color: theme === "light" ? "black" : "whitesmoke",
                  }}
                >
                  You must be a healthy person since your help expenses are
                  bellow average for people of your age
                </Text>
              </View>
            </View>

            <Container>
              <ArrayButtons
                buttons={["expenses", "incomes"]}
                onSelected={handleOnSelected}
              />
            </Container>

            <View style={{ marginTop: 6 }}>
              <Container>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {dataToRender?.map((item, index) => {
                    return item.percentage <= 0 ? null : (
                      <RenderItem
                        item={item}
                        key={index}
                        index={index}
                        numberOfMonths={numberOfMonths}
                      />
                    );
                  })}
                </View>
              </Container>
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default PieChartMain;
