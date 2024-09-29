import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Colors, useTheme } from "@/providers/ThemeContext";

type Props = {
  children: React.ReactNode;
  footer?: boolean;
  paperStyles?: StyleProp<ViewStyle>;
};

export const Card: React.FC<Props> = ({ children, footer, paperStyles }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.card,
          {
            backgroundColor:
              theme === "light" ? Colors.pearlWhite : Colors.black,

            overflow: "hidden",
          },
          paperStyles,
        ]}
      >
        <View
          style={{
            marginBottom: 45,
            borderBottomColor: theme === "dark" ? "transparent" : Colors.gray,
            borderBottomWidth: 0.5,
          }}
        >
          {children}
        </View>
        {footer && <View style={[styles.footer, {}]}></View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  card: {
    height: "100%",

    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: 90,
  },
  footer: {
    height: 45,
  },
});
