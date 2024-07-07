import { IconCard } from "@/components/Atoms/IconCard";
import { Colors, useTheme } from "@/providers/ThemeContext";

import { View, Text } from "react-native";

type Props = {
  height?: number;
  data: {
    value: number;
    iconId: number;
  }[];
};

export const HorizontalBarChart: React.FC<Props> = ({ data, height }) => {
  const { mainColor } = useTheme();
  const maxValue = Math.max(...data.map((item) => item.value));
  const minValue = Math.min(...data.map((item) => item.value));
  const absoluteMax = Math.max(Math.abs(maxValue), Math.abs(minValue));

  return (
    <View style={{ rowGap: 5, position: "relative" }}>
      {data?.map((item, index) => {
        const leftPercentage =
          minValue >= 0
            ? 0
            : item.value > 0 && minValue < 0
            ? 50
            : 50 - (Math.abs(item.value) / absoluteMax) * 50;
        return (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              columnGap: 5,
              alignItems: "center",
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <IconCard iconId={item.iconId} size={height} />
            </View>
            <View
              style={{
                flex: 1,
                position: "relative",
                width: "auto",
                height: "85%",
              }}
            >
              {minValue < 0 && index === 0 && (
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "gray",
                    width: 2,
                    left: "50%",
                    top: -6,
                    height: "450%",

                    zIndex: 100,
                  }}
                />
              )}
              <View
                style={{
                  position: "absolute",
                  left: `${leftPercentage}%`,
                  backgroundColor: mainColor,
                  flex: 1,
                  //borderRadius: 4,
                  width: `${
                    ((Math.abs(item.value) / absoluteMax) * 100) /
                    (minValue < 0 ? 2 : 1)
                  }%`,
                  height: "100%",
                  //   shadowColor: "#000",
                  //   shadowOffset: { height: 0, width: 2 },
                  //   shadowOpacity: 0.25,
                  //   shadowRadius: 2,
                  //   elevation: 2,
                }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};
