import { View, Text, ActivityIndicator } from "react-native";

export const LoaderSpinner = ({ color }: { color?: string }) => {
  return (
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
        }}
      >
        sa
      </Text>
      <ActivityIndicator size="small" color={color || "white"} />
      <Text
        style={{
          color: "transparent",
          fontWeight: "800",
          fontSize: 20,
        }}
      >
        sa
      </Text>
    </View>
  );
};

export default LoaderSpinner;
