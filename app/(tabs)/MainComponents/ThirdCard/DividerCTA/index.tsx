import { Divider } from "@/components/Atoms/Divider";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { View, Text } from "react-native";

type Props = {
  label: string;
};

export const DividerCTA = ({ label }: Props) => {
  const { mainColor } = useTheme();
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
            backgroundColor: Colors.pearlWhite,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },

            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <Text
            style={{
              color: Colors.gray,
              textTransform: "capitalize",
              fontSize: 20,
              fontWeight: 800,
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
