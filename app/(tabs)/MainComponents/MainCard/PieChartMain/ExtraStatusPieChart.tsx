import { Colors, useTheme } from "@/providers/ThemeContext";
import { View, Text } from "react-native";

export const ExtraStatusPieChart = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "auto",
        padding: 10,
        flex: 1,
        rowGap: 10,
      }}
    >
      <View>
        <Text
          style={{
            textAlign: "left",
            fontSize: 14,
            color: theme === "light" ? "gray" : "whitesmoke",
          }}
        >
          Car
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontSize: 22,
            marginTop: -3,
            fontWeight: 600,
            color: Colors.black,
          }}
        >
          + 23%
        </Text>
      </View>
      <View>
        <Text
          style={{
            textAlign: "left",
            fontSize: 14,
            color: theme === "light" ? "gray" : "whitesmoke",
          }}
        >
          Car
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontSize: 22,
            marginTop: -3,
            fontWeight: 600,
            color: Colors.black,
          }}
        >
          + 23%
        </Text>
      </View>
      <View>
        <Text
          style={{
            textAlign: "left",
            fontSize: 14,
            color: theme === "light" ? "gray" : "whitesmoke",
          }}
        >
          Car
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontSize: 22,
            marginTop: -3,
            fontWeight: 600,
            color: Colors.black,
          }}
        >
          + 23%
        </Text>
      </View>
    </View>
  );
};
