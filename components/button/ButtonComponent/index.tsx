import { useTheme } from "@/providers/ThemeContext";
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
  inverseColors?: boolean;
  fullwidth?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  isLoading?: boolean;
}

const Button = ({
  label,
  onPress,
  inverseColors,
  isLoading,
  fullwidth,
  buttonStyle,
  textStyle,
  ...rest
}: Props) => {
  const { mainColor } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} {...rest}>
      <View style={[styles.container, { backgroundColor: mainColor }]}>
        {isLoading ? (
          <View
            style={{
              height: 20,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "transparent",
                fontWeight: "800",
                fontSize: 20,
                ...textStyle,
              }}
            >
              sa
            </Text>
            <ActivityIndicator size="small" color="white" />
            <Text
              style={{
                color: "transparent",
                fontWeight: "800",
                fontSize: 20,
                ...textStyle,
              }}
            >
              sa
            </Text>
          </View>
        ) : (
          <Text
            style={{
              color: "white",

              fontSize: 16,
              ...textStyle,
            }}
          >
            {label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    padding: 12,

    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android only
  },
});
