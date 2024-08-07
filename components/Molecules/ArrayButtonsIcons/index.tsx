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
  id: number; //SharedValue<number>;
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

  const BUTTON_GAP = 10;
  const ICON_SIZE = iconSize;
  const ICON_PADDING = 8;
  const BUTTON_WIDTH = iconSize + ICON_PADDING * 2;
  const BUTTON_PADDING = ICON_PADDING / 2;
  const [selected, setSelected] = useState(0);

  const animationLeft = useAnimatedStyle(() => {
    return {
      left: ICON_PADDING / 2,
      top: ICON_PADDING / 2,
      position: "absolute",
      backgroundColor: theme === "light" ? mainColor : Colors.black,
      borderRadius: ICON_SIZE,
      height: BUTTON_WIDTH,
      width: BUTTON_WIDTH,
      transform: [
        {
          translateX: withTiming(BUTTON_WIDTH * id + BUTTON_GAP * id, {
            duration: 400,
          }),
        },
      ],
    };
  });

  useAnimatedReaction(
    () => {
      return id;
    },
    () => {
      runOnJS(setSelected)(id);
    },
    []
  );

  return (
    <View
      style={{
        backgroundColor: theme === "light" ? Colors.black : "#ffffff1A",

        width:
          BUTTON_WIDTH * buttonList.length +
          BUTTON_GAP * (buttonList.length - 1) +
          ICON_PADDING,
        borderRadius: 2 * BUTTON_WIDTH,
        flexDirection: "row",
        display: "flex",
        padding: BUTTON_PADDING,
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
                  ? id === index
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
