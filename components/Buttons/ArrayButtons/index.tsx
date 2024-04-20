import { Pressable, View, Text } from "react-native";
import { ArrayButtonsProps } from "./arrayButtons.type";
import { useState } from "react";
import { Colors, useTheme } from "@/providers/ThemeContext";

export const ArrayButtons: React.FC<ArrayButtonsProps<any>> = ({
  buttons,
  onSelected,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(buttons[0]);
  const { mainColor, contrastColor, theme } = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme === "light" ? Colors.black : "#ffffff1A",

        borderRadius: 24,
        flexDirection: "row",
        padding: 4,

        columnGap: 8,
      }}
    >
      {buttons.map((button) => {
        return (
          <Pressable
            key={button}
            onPress={() => {
              if (onSelected) onSelected(button as typeof button);
              setSelectedStatus(button);
            }}
            style={{
              backgroundColor:
                selectedStatus === button ? mainColor : "transparent",
              borderRadius: 20,
              padding: 6,
              paddingHorizontal: 10,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: theme === "light" ? "white" : contrastColor,
                fontSize: 13,
                lineHeight: 14,
                opacity: selectedStatus === button ? 1 : 0.7,
              }}
            >
              {button}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
