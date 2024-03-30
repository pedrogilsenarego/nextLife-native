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
              borderTopRightRadius: 1,
              paddingHorizontal: 20,

              paddingBottom: 80,

              elevation: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -20 },
              shadowOpacity: 1,
              shadowRadius: 10,
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
