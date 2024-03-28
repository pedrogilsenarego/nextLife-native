import { Text, View } from "@/components/Themed";
import { Keyboard, SafeAreaView, TouchableWithoutFeedback } from "react-native";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "orangered",
          }}
        >
          <LoginForm />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Login;
