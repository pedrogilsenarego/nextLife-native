import { Pressable, View, Text, Animated, Easing } from "react-native";
import { ArrayButtonsProps } from "./arrayButtons.type";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Colors, useTheme } from "@/providers/ThemeContext";

export const ArrayButtons: React.FC<ArrayButtonsProps<any>> = memo(
  ({ buttons, onSelected, textColor, defaultValue }) => {
    const GAP_BUTTONS = 6;
    const [buttonWidth, setButtonWidth] = useState<number[]>(
      Array(buttons.length).fill(0)
    );
    const [selectedStatus, setSelectedStatus] = useState<string>(
      defaultValue || buttons[0]
    );
    const { theme } = useTheme();
    const animationLeft = useRef(new Animated.Value(0)).current;
    const animationWidth = useRef(new Animated.Value(buttonWidth[0])).current;

    useEffect(() => {
      if (buttonWidth[0] !== 0) {
        Animated.spring(animationWidth, {
          toValue: buttonWidth[0],
          useNativeDriver: false,
          speed: 1,
          bounciness: 1,
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

        Animated.spring(animationLeft, {
          toValue: totalLeft,
          useNativeDriver: false,
          speed: 1,
          bounciness: 1,
        }).start();

        Animated.spring(animationWidth, {
          toValue: buttonWidth[index],
          useNativeDriver: false,
          speed: 1,
          bounciness: 1,
        }).start();
      },
      [onSelected, buttonWidth]
    );

    return (
      <View
        style={{
          backgroundColor: theme === "dark" ? Colors.black : Colors.pearlWhite,
          position: "relative",
          borderRadius: 5,
          flexDirection: "row",
          padding: 2,
          columnGap: GAP_BUTTONS,
        }}
      >
        <Animated.View
          style={{
            top: 2,
            left: 2,
            backgroundColor: theme === "dark" ? Colors.gray : Colors.white,
            height: 30,
            width: animationWidth,
            borderRadius: 4,
            position: "absolute",
            padding: 4,
            paddingHorizontal: 8,
            justifyContent: "center",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.15,
            shadowRadius: 1,
            elevation: 2,
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
                borderRadius: 20,
                padding: 8,
                paddingHorizontal: 8,
                justifyContent: "center",
                zIndex: 1000,
              }}
            >
              <Text
                style={{
                  color:
                    textColor ||
                    (theme === "dark" ? Colors.white : Colors.black),
                  textTransform: "capitalize",
                  fontSize: 14,
                  lineHeight: 14,
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
