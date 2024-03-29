import { View } from "@/components/Themed";
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "orangered" }}>
      <StatusBar barStyle={"light-content"} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={{
            display: "flex",
            height: "100%",
            paddingTop: 140,
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 120, objectFit: "contain" }}
            source={require("../../assets/images/logo.png")}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              columnGap: 40,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                borderBottomWidth: 3,
                fontSize: 18,
                borderColor: "orangered",
                fontWeight: "500",
              }}
            >
              LOGIN
            </Text>
            <Text
              style={{
                borderBottomWidth: 3,
                fontSize: 18,
                borderColor: "white",
                fontWeight: "500",
              }}
            >
              SIGNUP
            </Text>
          </View>
          <LoginForm />
          <Text
            style={{
              borderBottomWidth: 2,
              borderColor: "white",
              fontWeight: "500",
              color: "gray",
            }}
          >
            Forgot Password?
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Login;
