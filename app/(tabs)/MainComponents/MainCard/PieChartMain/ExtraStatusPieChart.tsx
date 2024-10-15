import { Colors, useTheme } from "@/providers/ThemeContext";
import { View, Text } from "react-native";

export const ExtraStatusPieChart = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        alignItems: "flex-start",
        justifyContent: "flex-start",
        position: "relative",
        flex: 1,
        rowGap: 10,
      }}
    >
      <View
        style={{
          position: "absolute",
          backgroundColor: Colors.black,
          zIndex: 2,
          borderRadius: 20,
          paddingHorizontal: 10,
          paddingVertical: 2,
          alignItems: "center",
          right: 38,
          top: 6,
        }}
      >
        <Text style={{ color: Colors.white, fontSize: 12 }}>Soon</Text>
      </View>
      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
          rowGap: 10,

          backgroundColor: Colors.pearlWhite,
          padding: 10,
          borderRadius: 6,
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
            Groceries
          </Text>
          <Text
            style={{
              textAlign: "left",
              fontSize: 18,
              marginTop: -3,
              fontWeight: 600,
              color: "black",
            }}
          >
            + 13%/150€
          </Text>
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              marginTop: -4,
              fontWeight: 600,
              color: "grey",
            }}
          >
            goal: -13%/300€
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
              fontSize: 18,
              marginTop: -3,
              fontWeight: 600,
              color: "black",
            }}
          >
            - 23%/200€
          </Text>
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              marginTop: -4,
              fontWeight: 600,
              color: "grey",
            }}
          >
            goal: -10%/233€
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
            Transports
          </Text>
          <Text
            style={{
              textAlign: "left",
              fontSize: 18,
              marginTop: -3,
              fontWeight: 600,
              color: "black",
            }}
          >
            - 4%/234€
          </Text>
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              marginTop: -4,
              fontWeight: 600,
              color: "grey",
            }}
          >
            goal: -10%/167€
          </Text>
        </View>
      </View>
    </View>
  );
};
