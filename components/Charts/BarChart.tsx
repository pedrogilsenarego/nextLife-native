import { useTheme } from "@/providers/ThemeContext";
import { View, Text } from "react-native";

type Props = {
  leftLabel?: boolean;
  height?: number;
};

const BarChart = (props: Props) => {
  const { mainColor } = useTheme();
  const labelWidth = 7;
  const chartHeight = props.height || 250;
  const bottomLabelHeight = 12;
  const data = [
    { name: "Aug 24", percentage: 50 },
    { name: "Set 24", percentage: 12 },
    { name: "Oct 24", percentage: 32 },
    { name: "Nov 24", percentage: 78 },
    { name: "Dec 24", percentage: 50 },
    { name: "Jan 25", percentage: 90 },
    { name: "Feb 25", percentage: 45 },
    { name: "Mar 25", percentage: 90 },
    { name: "May 25", percentage: 45 },
  ];

  const avg = 54;

  return (
    <View style={{ height: chartHeight, flexDirection: "row" }}>
      {props.leftLabel && (
        <View
          style={{
            width: `${labelWidth}%`,
            alignItems: "flex-start",

            height: chartHeight - bottomLabelHeight,
          }}
        >
          <Text style={{ fontSize: 10 }}>3.4k</Text>
        </View>
      )}
      <View
        style={{
          width: labelWidth ? `${100 - labelWidth}%` : "100%",
          flexDirection: "row",
          position: "relative",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            height: 1,
            borderBottomWidth: 1,
            borderColor: "black",
            borderStyle: "dashed",
            width: "100%",
            position: "absolute",
            top: `${100 - avg}%`,
            zIndex: 20,
          }}
        >
          <View style={{ position: "relative" }}>
            <Text
              style={{
                position: "absolute",
                left: 0,
                fontSize: 12,

                paddingHorizontal: 4,
              }}
            >
              Avg: {avg}%
            </Text>
          </View>
        </View>
        {data.map((item, index) => {
          return (
            <View
              style={{
                height: "100%",
                position: "relative",
                backgroundColor: "#ffffff66",
                borderRadius: 6,
                overflow: "hidden",
                width: `${100 / data.length - 10 / data.length}%`,
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  backgroundColor: `${mainColor}B3`,
                  height: `${item.percentage}%`,
                  borderRadius: 6,
                  bottom: 0,
                }}
              />
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  height: bottomLabelHeight,
                }}
              >
                <Text style={{ fontSize: 9, lineHeight: 12 }}>{item.name}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default BarChart;
