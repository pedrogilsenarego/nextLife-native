import { Pressable, View, Text, Animated } from "react-native";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { ArrayButtonsProps } from "./arrayButtons.type";
import React from "react";

export const ArrayButtons: React.FC<ArrayButtonsProps<any>> = memo(
  ({ buttons, onSelected, textColor, defaultValue }) => {
    const GAP_BUTTONS = 6;
    const buttonRefs = useRef<Array<any>>(buttons.map(() => React.createRef())); // Array of refs
    const [selectedStatus, setSelectedStatus] = useState<string>(
      defaultValue || buttons[0]
    );
    const { theme } = useTheme();
    const animationLeft = useRef(new Animated.Value(0)).current;
    const animationWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      const buttonWidths = buttonRefs.current.map((ref) =>
        ref?.current?.measure
          ? new Promise<number>((resolve) =>
              ref.current.measure((x: any, y: any, width: any) =>
                resolve(width)
              )
            )
          : Promise.resolve(0)
      );

      Promise.all(buttonWidths).then((widths) => {
        const selectedIndex = buttons.findIndex(
          (button) => button === selectedStatus
        );

        if (widths[selectedIndex] !== undefined) {
          const totalLeft = widths
            .slice(0, selectedIndex)
            .reduce((acc, width) => acc + width + GAP_BUTTONS, 0);

          // Animate left position
          Animated.spring(animationLeft, {
            toValue: totalLeft,
            useNativeDriver: false,
            speed: 15, // Speed of animation
            bounciness: 10, // Bouncing effect
          }).start();

          // Animate width
          Animated.spring(animationWidth, {
            toValue: widths[selectedIndex],
            useNativeDriver: false,
            speed: 15,
            bounciness: 10,
          }).start();
        }
      });
    }, [selectedStatus]);

    const handlePress = useCallback(
      (button: any, index: number) => {
        if (onSelected) onSelected(button);
        setSelectedStatus(button); // Update selected status
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
              onPress={() => handlePress(button, index)}
              ref={buttonRefs.current[index]} // Assign ref to each Pressable
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
