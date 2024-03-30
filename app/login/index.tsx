import { View } from "@/components/Themed";
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  Image,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import LoginForm from "./LoginForm";
import { useState } from "react";
import BottomPopup from "@/components/BottomPopup";
import Info from "./Info";

const Login = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <SafeAreaView style={{ backgroundColor: "orangered" }}>
      <StatusBar barStyle={"light-content"} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={{ backgroundColor: "orangered", display: "flex", rowGap: 3 }}
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
          <TouchableOpacity onPress={() => setOpenModal(true)}>
            <View
              style={{
                display: "flex",
                height: "15%",
                marginHorizontal: 4,
                alignItems: "center",
                justifyContent: "center",

                borderRadius: 12,
                shadowColor: "#000",

                paddingTop: 14,
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
              <Info />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      <BottomPopup openModal={openModal} onClose={() => setOpenModal(false)}>
        <View style={{ display: "flex", alignItems: "center" }}>
          <Info />
          <Text style={{ marginTop: 10 }}>This is the first version.</Text>
          <Text>Only Basic functionality is present for testing purposes</Text>
        </View>
      </BottomPopup>
    </SafeAreaView>
  );
};

export default Login;
