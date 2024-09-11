import { Colors, useTheme } from "@/providers/ThemeContext";
import React from "react";
import {
  ActivityIndicator,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
  StyleSheet,
} from "react-native";

interface Props extends TouchableOpacityProps {
  label: string;

  fullwidth?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  isLoading?: boolean;
  variant?: "ghost" | "default" | "danger";
}

const Button = ({
  label,
  onPress,

  isLoading,
  fullwidth,
  buttonStyle,
  variant = "default",
  textStyle,
  ...rest
}: Props) => {
  const { mainColor, theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: 8,
      padding: 12,
      borderRadius: 6,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: variant === "ghost" ? 1 : 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: variant === "ghost" ? 2.84 : 3.84,
      elevation: variant === "ghost" ? 1 : 5, // Android only
      backgroundColor:
        variant === "danger"
          ? Colors.red
          : variant === "ghost"
          ? "white"
          : theme === "light"
          ? mainColor
          : Colors.greenPuke,
      borderWidth: variant === "ghost" ? 0 : 0,
      borderColor: variant === "ghost" ? mainColor : "transparent",
    },
    text: {
      color:
        variant === "ghost" ? mainColor : theme === "dark" ? "black" : "white",
      fontWeight: "bold",
      textTransform: "capitalize",
      letterSpacing: 1,
      fontSize: 16,
    },
    loadingText: {
      color: "transparent",
      fontWeight: "800",
      fontSize: 20,
    },
    loadingContainer: {
      height: 20,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
  });

  return (
    <TouchableOpacity onPress={onPress} {...rest}>
      <View style={[styles.container, buttonStyle]}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={[styles.loadingText, textStyle]}>sa</Text>
            <ActivityIndicator size="small" color="white" />
            <Text style={[styles.loadingText, textStyle]}>sa</Text>
          </View>
        ) : (
          <Text style={[styles.text, textStyle]}>{label}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
