import { Divider } from "@/components/Atoms/Divider";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { View, Text } from "react-native";

export const DividerCTA = () => {
  const { mainColor } = useTheme();
  return (
    <View style={{ marginTop: 40, position: "relative" }}>
      <View
        style={{
          position: "absolute",
          top: -18,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
        }}
      >
        <View
          style={{
            borderWidth: 2,
            borderRadius: 20,
            paddingVertical: 4,
            paddingHorizontal: 16,
            borderColor: mainColor,
            backgroundColor: Colors.pearlWhite,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },

            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text
            style={{
              color: mainColor,
              textTransform: "uppercase",
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            Business
          </Text>
        </View>
      </View>
      <Divider />
    </View>
  );
};
