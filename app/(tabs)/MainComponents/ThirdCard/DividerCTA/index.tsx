import { Divider } from "@/components/Atoms/Divider";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { View, Text } from "react-native";

type Props = {
  label: string;
};

export const DividerCTA = ({ label }: Props) => {
  return (
    <View style={{ position: "relative" }}>
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
            borderWidth: 1,
            borderRadius: 20,
            paddingVertical: 4,
            paddingHorizontal: 16,
            borderColor: Colors.lightGray,
            backgroundColor: Colors.white,
            shadowColor: "#000",
            shadowOffset: {
              width: 0.5,
              height: 1,
            },

            shadowOpacity: 0.35,
            shadowRadius: 0.5,
            elevation: 2,
          }}
        >
          <Text
            style={{
              color: Colors.gray,
              textTransform: "capitalize",
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            {label}
          </Text>
        </View>
      </View>
      <Divider />
    </View>
  );
};
