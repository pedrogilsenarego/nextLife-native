import { Colors, useTheme } from "@/providers/ThemeContext";
import React from "react";
import { View, ViewProps, StyleProp, ViewStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  containerStyles?: StyleProp<ViewStyle>; // Use StyleProp<ViewStyle> to define the type of containerStyles
};

export const Container: React.FC<Props> = ({
  children,
  containerStyles,
  ...props
}) => {
  const { theme } = useTheme();

  const defaultStyles: ViewStyle = {
    flexDirection: "row",
    backgroundColor: theme === "light" ? "white" : Colors.gray,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: theme === "light" ? 1 : 0,
    borderColor: Colors.lightGray,
    justifyContent: "space-between",
    columnGap: 5,
    alignItems: "flex-start",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  };

  // Merge the default styles with the styles passed via props
  const mergedStyles: StyleProp<ViewStyle> = [defaultStyles, containerStyles];

  return (
    <View style={mergedStyles} {...props}>
      {children}
    </View>
  );
};
