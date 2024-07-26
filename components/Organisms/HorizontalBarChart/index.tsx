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
  const range = Math.abs(maxValue) + (minValue < 0 ? Math.abs(minValue) : 0);
  const left = Math.abs((minValue / absoluteMax) * 100);

  return (
    <View style={{ rowGap: 5, position: "relative" }}>
      {data?.map((item, index) => {
        const leftPercentage =
          minValue >= 0 ? 0 : item.value > 0 && minValue < 0 ? left : 0;

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
                    borderRadius: 4,
                    width: 1,
                    left: `${left}%`,
                    top: -data.length * 2,
                    height: `${data.length * 150}%`,

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
                  borderTopStartRadius:
                    leftPercentage < 50 && minValue < 0 ? 2 : 0,
                  borderBottomStartRadius:
                    leftPercentage < 50 && minValue < 0 ? 2 : 0,
                  borderTopEndRadius: item.value > 0 ? 2 : 0,
                  borderBottomEndRadius: item.value > 0 ? 2 : 0,
                  width: `${
                    (Math.abs(item.value) / absoluteMax) *
                    100 *
                    ((100 - leftPercentage) / 100)
                  }%`,
                  height: "100%",
                }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};
