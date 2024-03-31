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
        <Text style={{ fontSize: 20, fontWeight: "600" }}>{title}</Text>
        <Text style={{ color: "gray" }}>{message}</Text>
      </View>
    </Modal>
  );
};

export default Dialog;
