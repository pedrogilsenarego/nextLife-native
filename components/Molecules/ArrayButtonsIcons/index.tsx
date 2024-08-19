import React, { useEffect, useState } from "react";
import { View, Pressable, ViewStyle } from "react-native";
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Colors, useTheme } from "@/providers/ThemeContext";

type Props = {
  onChange: (id: number) => void;
  id: SharedValue<number>;
  buttonList: string[];
  iconSize?: number;
};

export const ArrayButtonsIcons: React.FC<Props> = ({
  onChange,
  buttonList,
  iconSize = 10,
  id,
}) => {
  const { mainColor, contrastColor, theme } = useTheme();

  const BUTTON_GAP = 0;
  const ICON_SIZE = iconSize;
  const ICON_PADDING = 6;
  const BUTTON_WIDTH = 18;
  const BUTTON_PADDING = 2;
  const [selected, setSelected] = useState(0);

  const animationLeft = useAnimatedStyle(() => {
    return {
      left: BUTTON_PADDING,
      top: BUTTON_PADDING,
      position: "absolute",
      backgroundColor: theme === "light" ? mainColor : Colors.black,
      borderRadius: ICON_SIZE,
      height: BUTTON_WIDTH,
      width: BUTTON_WIDTH,
      transform: [
        {
          translateX: withTiming(
            BUTTON_WIDTH * id.value +
              (BUTTON_GAP + BUTTON_PADDING * 2) * id.value,
            {
              duration: 200,
            }
          ),
        },
      ],
    };
  });

  useAnimatedReaction(
    () => {
      return id;
    },
    () => {
      runOnJS(setSelected)(id.value);
    },
    []
  );

  return (
    <View
      style={{
        backgroundColor: theme === "light" ? Colors.black : "#ffffff1A",

        width:
          BUTTON_WIDTH * buttonList.length +
          BUTTON_PADDING * (buttonList.length - 1) +
          BUTTON_GAP * (buttonList.length - 1) +
          6,
        borderRadius: 24,
        flexDirection: "row",
        display: "flex",
        padding: 0,
        position: "relative",
        columnGap: BUTTON_GAP,
      }}
    >
      <Animated.View style={animationLeft} />
      {buttonList.map((button, index) => {
        return (
          <Pressable
            onPress={() => onChange(index)}
            style={{
              borderRadius: 18,
              padding: ICON_PADDING,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign
              name={button as any}
              color={
                theme === "light"
                  ? id.value === index
                    ? "white"
                    : "#ffffff66"
                  : contrastColor
              }
              size={ICON_SIZE}
            />
          </Pressable>
        );
      })}
    </View>
  );
};
