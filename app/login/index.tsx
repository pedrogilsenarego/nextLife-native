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
          style={{ backgroundColor: "orangered", display: "flex", rowGap: 4 }}
        >
          <View
            style={{
              display: "flex",
              height: "88%",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 4,
              borderRadius: 12,
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                columnGap: 30,
                marginTop: 60,
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
          <View
            style={{
              display: "flex",
              height: "15%",
              marginHorizontal: 4,
              alignItems: "center",
              justifyContent: "center",

              borderRadius: 12,
              shadowColor: "#000",

              paddingTop: 8,
              paddingBottom: 100,
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
                marginTop: -20,

                alignItems: "center",
                columnGap: 4,
              }}
            >
              <Text style={{ color: "gray", fontSize: 9 }}>v.1.0.0</Text>
              <Text style={{ fontSize: 9 }}>Powered by Pedro Sena Rego</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Login;
