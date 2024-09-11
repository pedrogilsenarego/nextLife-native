import Logo from "@/components/Logo";
import { View } from "react-native";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Logo scale={0.8} secondary="#0a2463" />
    </View>
  );
};

export default Loading;
