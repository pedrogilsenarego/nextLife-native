import { Pressable, View, Text, Animated, Easing } from "react-native";
import { ArrayButtonsProps } from "./arrayButtons.type";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Colors, useTheme } from "@/providers/ThemeContext";

export const ArrayButtons: React.FC<ArrayButtonsProps<any>> = memo(
  ({ buttons, onSelected }) => {
    const GAP_BUTTONS = 6;
    const [buttonWidth, setButtonWidth] = useState<number[]>(
      Array(buttons.length).fill(0)
    );
    const [selectedStatus, setSelectedStatus] = useState<string>(buttons[0]);
    const { mainColor, contrastColor, theme } = useTheme();
    const animationLeft = useRef(new Animated.Value(0)).current;
    const animationWidth = useRef(new Animated.Value(buttonWidth[0])).current;

    useEffect(() => {
      // Update animationWidth once buttonWidth is available
      if (buttonWidth[0] !== 0) {
        Animated.timing(animationWidth, {
          toValue: buttonWidth[0],
          duration: 500,
          useNativeDriver: false,
          easing: Easing.ease,
        }).start();
      }
    }, [buttonWidth]);

    const handleLayout = (event: any, index: number) => {
      const newWidths = [...buttonWidth];
      newWidths[index] = event.nativeEvent.layout.width;
      setButtonWidth(newWidths);
    };
    const handlePress = useCallback(
      (button: any, index: number) => {
        if (onSelected) onSelected(button as typeof button);
        setSelectedStatus(button);
        const totalLeft = buttonWidth
          .slice(0, index)
          .reduce((acc, width) => acc + width + GAP_BUTTONS, 0);

        Animated.timing(animationLeft, {
          toValue: totalLeft,
          duration: 200,
          useNativeDriver: false,
          easing: Easing.ease,
        }).start();
        Animated.timing(animationWidth, {
          toValue: buttonWidth[index],
          duration: 200,
          useNativeDriver: false,
          easing: Easing.ease,
        }).start();
      },
      [onSelected, buttonWidth]
    );
    return (
      <View
        style={{
          backgroundColor: theme === "light" ? Colors.black : "#ffffff1A",
          position: "relative",
          borderRadius: 24,
          flexDirection: "row",
          padding: 3,
          columnGap: GAP_BUTTONS,
        }}
      >
        <Animated.View
          style={{
            top: 3,
            left: 3,
            backgroundColor: theme === "light" ? mainColor : Colors.black,
            height: 22,
            width: animationWidth,

            borderRadius: 20,
            position: "absolute",
            padding: 4,
            paddingHorizontal: 8,
            justifyContent: "center",
            transform: [
              {
                translateX: animationLeft,
              },
            ],
          }}
        />
        {buttons.map((button, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => {
                handlePress(button, index);
              }}
              onLayout={(e) => handleLayout(e, index)}
              style={{
                // backgroundColor:
                //   selectedStatus === button ? mainColor : "transparent",
                borderRadius: 20,
                padding: 4,
                paddingHorizontal: 8,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: theme === "light" ? "white" : contrastColor,
                  fontSize: 12,
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
  }
);
