import Logo from "@/components/Logo";
import { useTheme } from "@/providers/ThemeContext";
import { Image, View, Text } from "react-native";

const Info = () => {
  const { mainColor } = useTheme();
  return (
    <>
      <View style={{ marginTop: 30, marginBottom: 2 }}>
        <Logo scale={0.5} secondary={mainColor} />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 0,

          alignItems: "center",
          columnGap: 4,
        }}
      >
        <Text style={{ color: "gray", fontSize: 9 }}>v.1.0.0</Text>
        <Text style={{ fontSize: 9 }}>Powered by Pedro Sena Rego</Text>
      </View>
    </>
  );
};
export default Info;
