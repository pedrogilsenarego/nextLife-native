import { IconCard } from "@/components/Atoms/IconCard";
import { useTheme } from "@/providers/ThemeContext";

import { View, Text } from "react-native";

export const HorizontalBarChart: React.FC = () => {
  const { mainColor } = useTheme();
  const data = [{ value: 100 }, { value: 50 }, { value: 20 }];
  return (
    <View style={{ rowGap: 5 }}>
      {data?.map((item, index) => {
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
              <IconCard />
            </View>
            <View
              style={{
                flex: 1,

                width: "auto",
                height: "85%",
              }}
            >
              <View
                style={{
                  backgroundColor: mainColor,
                  flex: 1,
                  borderRadius: 4,
                  width: `${item.value}%`,
                  height: "100%",
                  shadowColor: "#000",
                  shadowOffset: { height: 0, width: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 2,
                  elevation: 2,
                }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};
