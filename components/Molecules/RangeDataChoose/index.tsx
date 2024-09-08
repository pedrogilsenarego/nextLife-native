import { DateRangeValues, useApp } from "@/providers/AppProvider";
import { useTheme } from "@/providers/ThemeContext";
import { addMonths, format } from "date-fns";
import { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export const RangeDataChoose: React.FC = () => {
  const { dateRange, changeDateRange, changeSelectedDate } = useApp();
  const { mainColor } = useTheme();
  const currentDate = new Date();
  const lastMonth = addMonths(currentDate, -1);
  const lastLastMonth = addMonths(currentDate, -2);
  const currentMonth = format(currentDate, "MMM");
  const lastMonthF = format(lastMonth, "MMM");
  const lastLastMonthF = format(lastLastMonth, "MMM");

  console.log("render");

  const handleChange = (key: DateRangeValues) => {
    changeSelectedDate("Total");
    changeDateRange(key);
  };

  type selectorProps = {
    alias: DateRangeValues;
    value: string;
  };

  const Selector = (props: selectorProps) => {
    const paddingValue = useSharedValue(dateRange === props.alias ? 15 : 10);
    useEffect(() => {
      paddingValue.value = withTiming(dateRange === props.alias ? 15 : 10, {
        duration: 300,
      });
    }, [dateRange]);
    const animatedStyle = useAnimatedStyle(() => {
      return {
        paddingVertical: paddingValue.value,
      };
    });
    return (
      <Pressable onPress={() => handleChange(props.alias)}>
        <Animated.View
          style={[
            animatedStyle,
            {
              backgroundColor: mainColor,
              paddingHorizontal: 10,
              borderRadius: 4,
            },
          ]}
        >
          <Text
            style={{
              color: "white",
              fontSize: dateRange === props.alias ? 18 : 16,
              fontWeight: dateRange === props.alias ? "bold" : "normal",
            }}
          >
            {props.value}
          </Text>
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        display: "flex",
        marginTop: 10,
        flexDirection: "row",
        columnGap: 5,
        justifyContent: "space-between",
        paddingVertical: 4,
      }}
    >
      <Selector alias="currentMonth" value={currentMonth} />
      <Selector alias="lastMonth" value={lastMonthF} />
      <Selector alias="lastLastMonth" value={lastLastMonthF} />
      <Selector alias="3Months" value="3 M" />
      <Selector alias="6Months" value="6 M" />
      <Selector alias="1year" value="1 Y" />
      <Selector alias="3years" value="3 Y" />
    </View>
  );
};
