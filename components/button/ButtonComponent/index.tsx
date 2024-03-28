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
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} {...rest}>
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

              fontSize: 20,
              ...textStyle,
            }}
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    padding: 8,
    backgroundColor: "black",
    borderRadius: 4,
  },
});
