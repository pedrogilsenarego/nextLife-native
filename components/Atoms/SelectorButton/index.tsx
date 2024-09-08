import { Colors, useTheme } from "@/providers/ThemeContext";
import { Entypo } from "@expo/vector-icons";
import { View } from "react-native";
import { Pressable, Text } from "react-native";

type Props = {
  onPress: () => void;
  label: string;
  value: string | string[];
};

export const SelectorButton = (props: Props) => {
  const { mainColor } = useTheme();
  return (
    <Pressable onPress={props.onPress}>
      <View
        style={{
          backgroundColor: Colors.pearlWhite,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          borderRadius: 8,
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        <Text style={{ fontWeight: 600 }}>{props.label}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", columnGap: 6 }}>
            {typeof props.value === "string" ? (
              <Text style={{ color: "white", textTransform: "capitalize" }}>
                {props.value}
              </Text>
            ) : (
              props.value.map((category, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      padding: 8,
                      paddingVertical: 2,
                      borderRadius: 6,
                      backgroundColor: `${mainColor}66`,
                    }}
                  >
                    <Text
                      style={{ color: "white", textTransform: "capitalize" }}
                    >
                      {category}
                    </Text>
                  </View>
                );
              })
            )}
          </View>
          <Entypo name="chevron-small-right" size={30} />
        </View>
      </View>
    </Pressable>
  );
};
