import { Pressable, View, Text, Animated } from "react-native";
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
    const animationWidth = useRef(new Animated.Value(0)).current;

    // UseEffect for initial mount only
    useEffect(() => {
      if (buttonWidth[0] !== 0) {
        const selectedIndex = buttons.findIndex(
          (button) => button === selectedStatus
        );

        if (buttonWidth[selectedIndex] !== undefined) {
          const totalLeft = buttonWidth
            .slice(0, selectedIndex)
            .reduce((acc, width) => acc + width + GAP_BUTTONS, 0);

          // Set initial position and width
          animationLeft.setValue(totalLeft);
          animationWidth.setValue(buttonWidth[selectedIndex]);
        }
      }
    }, [buttonWidth]);

    // UseEffect for handling updates after mount (user interaction)
    useEffect(() => {
      if (buttonWidth[0] !== 0) {
        const selectedIndex = buttons.findIndex(
          (button) => button === selectedStatus
        );

        if (buttonWidth[selectedIndex] !== undefined) {
          const totalLeft = buttonWidth
            .slice(0, selectedIndex)
            .reduce((acc, width) => acc + width + GAP_BUTTONS, 0);

          // Animate position and width on button change
          Animated.spring(animationLeft, {
            toValue: totalLeft,
            useNativeDriver: false,
            speed: 1,
            bounciness: 1,
          }).start();

          Animated.spring(animationWidth, {
            toValue: buttonWidth[selectedIndex],
            useNativeDriver: false,
            speed: 1,
            bounciness: 1,
          }).start();
        }
      }
    }, [selectedStatus]);

    const handleLayout = (event: any, index: number) => {
      const newWidths = [...buttonWidth];
      newWidths[index] = event.nativeEvent.layout.width;
      setButtonWidth(newWidths);
    };

    const handlePress = useCallback(
      (button: any, index: number) => {
        if (onSelected) onSelected(button);
        setSelectedStatus(button); // Set selected status to trigger the animation
      },
      [onSelected]
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
