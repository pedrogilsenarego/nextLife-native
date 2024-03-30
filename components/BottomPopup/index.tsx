import React, { ReactNode, useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface IProps {
  children: ReactNode;
  onClose?: () => void;
  openModal: boolean;
}

const BottomPopup = ({ children, onClose, openModal }: IProps) => {
  const handlePressOutside = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openModal}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handlePressOutside}>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: "white",
              marginHorizontal: 4,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              paddingHorizontal: 30,

              paddingBottom: 40,

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.51,
              shadowRadius: 13.16,

              elevation: 20,
            }}
          >
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {},
});

export default BottomPopup;
