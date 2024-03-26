import { Text, View } from "@/components/Themed";
import { SafeAreaView } from "react-native";

const Login = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Teste</Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
