import { Colors } from "@/providers/ThemeContext";
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
  // Define the existing styles
  const defaultStyles: ViewStyle = {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
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
