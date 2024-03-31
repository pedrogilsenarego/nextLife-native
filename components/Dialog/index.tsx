import LottieView from "lottie-react-native";
import { useState } from "react";
import { Text, View } from "react-native";
import Modal from "react-native-modal/dist/modal";

type Props = {
  title: string;
  message: string;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

const Dialog = ({ title, message, isVisible, setIsVisible }: Props) => {
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
          borderColor: "orangered",
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
        <LottieView
          source={require("../../assets/images/Error.json")}
          autoPlay
          style={{
            width: "30%",
            aspectRatio: 1,
          }}
        />
        <Text style={{ fontSize: 20, fontWeight: "600" }}>{title}</Text>
        <Text style={{ color: "gray", marginTop: 5 }}>{message}</Text>
      </View>
    </Modal>
  );
};

export default Dialog;
