import { Colors, useTheme } from "@/providers/ThemeContext";
import React from "react";
import { View, ViewProps, StyleProp, ViewStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  containerStyles?: StyleProp<ViewStyle>;
  status?: string;
};

export const Container: React.FC<Props> = ({
  children,
  containerStyles,
  status,
  ...props
}) => {
  const { theme } = useTheme();

  const defaultStyles: ViewStyle = {
    flexDirection: "row",
    position: "relative",
    backgroundColor: theme === "light" ? "white" : Colors.gray,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: theme === "light" ? 1 : 0,
    borderLeftWidth: status ? 0 : undefined,
    borderColor: Colors.lightGray,
    justifyContent: "space-between",
    overflow: "hidden",
    columnGap: 5,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  };

  // Merge the default styles with the styles passed via props
  const mergedStyles: StyleProp<ViewStyle> = [defaultStyles, containerStyles];

  return (
    <View style={mergedStyles} {...props}>
      {status && (
        <View
          style={{
            position: "absolute",
            width: 4,
            height: "200%",
            backgroundColor: status,
          }}
        />
      )}
      {children}
    </View>
  );
};
