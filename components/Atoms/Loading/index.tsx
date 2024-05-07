import { View, Image } from "react-native";

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
      <Image
        style={{ width: 100, objectFit: "contain" }}
        source={require("../../../assets/images/logo.png")}
      />
    </View>
  );
};

export default Loading;
