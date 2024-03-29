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
            paddingTop: 160,
            alignItems: "center",

            borderRadius: 40,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, // Android only
          }}
        >
          <Image
            style={{ width: 150, objectFit: "contain" }}
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
            <View>
              <Text
                style={{
                  fontSize: 18,

                  fontWeight: "500",
                }}
              >
                LOGIN
              </Text>
              <View
                style={{
                  height: 3,
                  backgroundColor: "orangered",
                  borderRadius: 2,
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 18,

                  fontWeight: "500",
                }}
              >
                SIGNUP
              </Text>
              <View
                style={{
                  height: 3,
                  backgroundColor: "white",
                  borderRadius: 2,
                }}
              />
            </View>
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
