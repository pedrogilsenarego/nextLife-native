import { Colors, useTheme } from "@/providers/ThemeContext";
import { AntDesign } from "@expo/vector-icons";
import React, { ReactNode, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";

interface IProps {
  children: ReactNode;
  onClose?: () => void;
  openModal: boolean;
  fullHeight?: boolean;
  closeIcon?: boolean;
}

const BottomPopup = ({
  children,
  onClose,
  openModal,
  fullHeight,
  closeIcon,
}: IProps) => {
  const { theme } = useTheme();

  const backgroundColor = useDerivedValue(() => {
    return theme === "light" ? "white" : Colors.gray;
  }, [theme]);

  const handlePressOutside = () => {
    if (onClose) {
      onClose();
    }
  };

  const backgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(backgroundColor.value),
    };
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openModal}
      onRequestClose={onClose}
    >
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          if (!fullHeight) handlePressOutside();
        }}
      >
        <View style={styles.container}>
          <Pressable>
            <Animated.View
              style={[
                {
                  height: fullHeight ? "100%" : undefined,
                  position: "relative",

                  //marginHorizontal: 4,
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
                },
                backgroundColorAnimation,
              ]}
            >
              {closeIcon && (
                <Pressable
                  onPress={onClose}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: 52,
                    padding: 5,
                    borderWidth: 2,
                    borderColor: "gray",
                    borderRadius: 4,
                  }}
                >
                  <AntDesign name="close" size={22} color="gray" />
                </Pressable>
              )}
              {children}
            </Animated.View>
          </Pressable>
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
