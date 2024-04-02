import { Entypo, Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { Text, View, Image } from "react-native";
import Modal from "react-native-modal/dist/modal";

type Props = {
  title: string;
  message: string;
  isVisible: boolean;
  type: "error" | "success";
  setIsVisible: (isVisible: boolean) => void;
};

const Dialog = ({ title, message, type, isVisible, setIsVisible }: Props) => {
  return (
    <Modal
      swipeDirection={["down", "left", "right", "up"]}
      backdropOpacity={0.8}
      swipeThreshold={50}
      onSwipeComplete={() => setIsVisible(false)}
      isVisible={isVisible}
      backdropColor="white"
      onBackdropPress={() => setIsVisible(false)}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          marginHorizontal: 30,
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          borderWidth: 2,
          borderColor: type === "error" ? "orangered" : "#5BC85B",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },

          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        {type === "error" ? (
          <LottieView
            source={require("../../assets/images/Error.json")}
            autoPlay
            style={{
              width: "30%",
              aspectRatio: 1,
            }}
          />
        ) : (
          <View style={{ position: "relative" }}>
            <LottieView
              source={require("../../assets/images/Success.json")}
              autoPlay
              style={{
                width: "75%",
                marginTop: -30,
                marginBottom: -30,
                aspectRatio: 1.5,
              }}
            ></LottieView>
            <Entypo
              name="check"
              color={"whitesmoke"}
              size={26}
              style={{
                position: "absolute",
                bottom: "37%",
                left: "31%",
              }}
            />
          </View>
        )}
        <Text style={{ fontSize: 20, fontWeight: "600" }}>{title}</Text>
        <Text style={{ color: "gray", marginTop: 5 }}>{message}</Text>
      </View>
    </Modal>
  );
};

export default Dialog;
