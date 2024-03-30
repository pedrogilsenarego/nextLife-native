import { View } from "@/components/Themed";
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  Image,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Pressable,
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
          <Pressable onPress={() => setOpenModal(true)}>
            <View
              style={{
                display: "flex",
                height: "15%",
                marginHorizontal: 4,
                alignItems: "center",
                justifyContent: "center",

                borderRadius: 12,
                shadowColor: "#000",

                paddingTop: 18,
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
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
      <BottomPopup openModal={openModal} onClose={() => setOpenModal(false)}>
        <View style={{ display: "flex" }}>
          <View style={{ display: "flex", alignItems: "center" }}>
            <Info />
          </View>
          <Text style={{ marginTop: 15, fontWeight: "600" }}>About</Text>
          <Text>
            This project aims to foster a vibrant community by continually
            enhancing the application with new features and improved user
            experiences. Our goal is to provide users with a dynamic and
            evolving platform that adapts to their needs over time. To ensure
            the highest level of security for user data, we leverage third-party
            data centers, which entail associated costs. As the application
            grows, it may become necessary to implement monetization strategies
            to sustain its operation and further development efforts.
          </Text>
          <Text style={{ fontWeight: "600", marginTop: 3 }}>
            pedrogilsenarego@gmail.com
          </Text>
          <Text style={{ marginTop: 15, fontWeight: "600" }}>
            Version (1.0.0)
          </Text>
          <Text>Adding Expenses and Incomes</Text>
          <Text>Checking main Metrics</Text>
          <Text>Login, Logout and Register New User</Text>
        </View>
      </BottomPopup>
    </SafeAreaView>
  );
};

export default Login;
