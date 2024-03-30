import { Image, View, Text } from "react-native";

const Info = () => {
  return (
    <>
      <Image
        style={{ width: 150, objectFit: "contain" }}
        source={require("../../../assets/images/logo.png")}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: -20,

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
