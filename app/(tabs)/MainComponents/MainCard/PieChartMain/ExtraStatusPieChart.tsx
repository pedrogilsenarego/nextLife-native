import { Colors, useTheme } from "@/providers/ThemeContext";
import { View, Text } from "react-native";

export const ExtraStatusPieChart = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        alignItems: "flex-start",
        justifyContent: "flex-start",

        flex: 1,
        rowGap: 10,
      }}
    >
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
              fontSize: 22,
              marginTop: -3,
              fontWeight: 600,
              color: "grey",
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
              fontSize: 22,
              marginTop: -3,
              fontWeight: 600,
              color: "grey",
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
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",

            width: "100%",
          }}
        >
          <Text style={{ color: "black", fontSize: 12, fontWeight: 600 }}>
            Target Objectives
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 35,
              fontWeight: 600,
              marginTop: -6,
            }}
          >
            Soon
          </Text>
        </View>
      </View>
    </View>
  );
};
