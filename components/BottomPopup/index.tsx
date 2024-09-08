import { Colors, useTheme } from "@/providers/ThemeContext";
import { AntDesign } from "@expo/vector-icons";
import React, { CSSProperties, ReactNode, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  ViewProps,
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
  subtitle?: string;
  bgColor?: boolean;
  rightHeaderComponent?: React.ReactNode;
}

const BottomPopup = ({
  children,
  onClose,
  openModal,
  fullHeight,
  rightHeaderComponent,
  title,
  subtitle,
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
          theme === "dark" || !fullHeight || !openModal || bgColor
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
                    paddingHorizontal: 5,
                    flexDirection: "row",
                    columnGap: 5,
                    justifyContent: "space-between",
                    alignItems: "center",

                    borderBottomWidth: bgColor ? 0 : 1,
                    marginTop: 45,
                    borderBottomColor: "lightgray",
                    paddingVertical: 8,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      columnGap: 5,
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",

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
                        <AntDesign
                          name="closecircle"
                          size={22}
                          color={bgColor ? Colors.white : mainColor}
                        />
                      </Pressable>
                    </View>
                    {title && (
                      <View>
                        {title && (
                          <Text
                            style={{
                              textTransform: "capitalize",
                              fontSize: 16,
                              fontWeight: 700,
                              color: bgColor ? Colors.white : Colors.black,
                            }}
                          >
                            {title}
                          </Text>
                        )}
                        {subtitle && (
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 500,
                              color: "gray",
                              lineHeight: 12,
                            }}
                          >
                            {subtitle}
                          </Text>
                        )}
                      </View>
                    )}
                  </View>
                  {rightHeaderComponent}
                </View>
              )}
              {title && !fullHeight && (
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    textAlign: "center",
                    paddingVertical: 10,
                  }}
                >
                  {title}
                </Text>
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
  styles?: ViewProps["style"];
};

const BottomPopupContent: React.FC<BottomPopupContentProps> = (props) => {
  return (
    <View
      style={[
        {
          paddingHorizontal: 15,
          height: props.fullHeight ? "100%" : "auto",
          paddingBottom: 40,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          flexGrow: 1,
          backgroundColor: props.fullHeight ? Colors.pearlWhite : Colors.white,
        },
        props.styles,
      ]}
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
        paddingHorizontal: 15,
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
