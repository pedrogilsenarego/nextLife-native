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
  Text,
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
  title?: string;
  bgColor?: boolean;
}

const BottomPopup = ({
  children,
  onClose,
  openModal,
  fullHeight,
  title,
  bgColor,
}: IProps) => {
  const { theme, mainColor } = useTheme();

  const backgroundColor = bgColor
    ? useDerivedValue(() => {
        return theme === "light" ? mainColor : Colors.gray;
      }, [theme])
    : useDerivedValue(() => {
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
        barStyle={
          theme === "dark" || !fullHeight || !openModal
            ? "light-content"
            : "dark-content"
        }
      />
      <TouchableWithoutFeedback
        onPress={() => {
          if (!fullHeight) handlePressOutside();
        }}
      >
        <View style={[styles.container]}>
          <Pressable>
            <Animated.View
              style={[
                {
                  height: fullHeight ? "100%" : undefined,
                  position: "relative",

                  //marginHorizontal: 4,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,

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
              {fullHeight && (
                <View
                  style={{
                    display: "flex",
                    paddingHorizontal: 25,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    columnGap: 10,
                    borderBottomWidth: 1,
                    marginTop: 38,
                    borderBottomColor: "gray",
                    paddingVertical: 4,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      width: "20%",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Pressable
                      onPress={onClose}
                      style={{
                        padding: 5,

                        borderRadius: 4,
                      }}
                    >
                      <AntDesign name="close" size={26} color={mainColor} />
                    </Pressable>
                  </View>

                  {title && (
                    <Text style={{ fontSize: 20, fontWeight: 700 }}>
                      {title}
                    </Text>
                  )}
                  <View style={{ width: "20%" }} />
                </View>
              )}
              {children}
            </Animated.View>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

type BottomPopupContentProps = {
  children: React.ReactNode;
  fullHeight?: boolean;
};

const BottomPopupContent: React.FC<BottomPopupContentProps> = (props) => {
  return (
    <View
      style={{
        paddingHorizontal: 30,

        height: "auto",
        paddingBottom: 40,
        flexGrow: 1,
      }}
    >
      {props.children}
    </View>
  );
};

type Props = {
  label?: string;
  children?: React.ReactNode;
};

const BottomPopupNotification: React.FC<Props> = (props) => {
  const { mainColor } = useTheme();
  return (
    <View
      style={{
        backgroundColor: mainColor,
        paddingVertical: 16,
        paddingHorizontal: 30,
      }}
    >
      {props.label && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            columnGap: 10,
          }}
        >
          <AntDesign name="infocirlce" color={"white"} size={16} />
          <Text
            style={{
              color: Colors.white,
              flex: 1,
              flexWrap: "wrap",
              fontSize: 14,
              lineHeight: 16,
            }}
          >
            {props.label}
          </Text>
        </View>
      )}
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {},
});

export { BottomPopup, BottomPopupNotification, BottomPopupContent };
