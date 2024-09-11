import { addMonths, format } from "date-fns";
import { View } from "react-native";
import { Selector } from "./Selector";

export const RangeDataChoose: React.FC = () => {
  const currentDate = new Date();
  const lastMonth = addMonths(currentDate, -1);
  const lastLastMonth = addMonths(currentDate, -2);
  const currentMonth = format(currentDate, "MMM");
  const lastMonthF = format(lastMonth, "MMM");
  const lastLastMonthF = format(lastLastMonth, "MMM");

  return (
    <View
      style={{
        position: "relative",
        height: 66,
        marginTop: 20,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          position: "absolute",
          display: "flex",

          flexDirection: "row",
          columnGap: 5,
          justifyContent: "space-between",
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
    </View>
  );
};
