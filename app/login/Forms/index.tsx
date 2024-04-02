import React, { useState, useRef } from "react";
import {
  Pressable,
  View,
  Text,
  Animated,
  StyleSheet,
  Easing,
} from "react-native";
import LoginForm from "./LoginForm";
import { useTheme } from "@/providers/ThemeContext";
import SignupForm from "./SignupForm";

const Forms = () => {
  const { mainColor, theme } = useTheme();
  const [loginWidth, setLoginWidth] = useState(0);
  const [signupWidth, setSignupWidth] = useState(0);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [barStart, setBarStart] = useState(0);
  const animation = useRef(
    new Animated.Value(mode === "login" ? 0 : 1)
  ).current;

  const handlePress = (selectedMode: "login" | "signup") => {
    Animated.timing(animation, {
      toValue: selectedMode === "login" ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();
    setMode(selectedMode);
  };

  const handleLoginLayout = (event: any) => {
    setLoginWidth(event.nativeEvent.layout.width);
    if (mode === "login") {
      setBarStart(event.nativeEvent.layout.x);
    }
  };

  const handleSignupLayout = (event: any) => {
    setSignupWidth(event.nativeEvent.layout.width);
    if (mode === "signup") {
      setBarStart(event.nativeEvent.layout.x);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable
          onPress={() => handlePress("login")}
          style={styles.button}
          onLayout={handleLoginLayout}
        >
          <Text
            style={[
              styles.text,
              { color: theme === "light" ? "black" : "white" },
            ]}
          >
            LOGIN
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handlePress("signup")}
          style={styles.button}
          onLayout={handleSignupLayout}
        >
          <Text
            style={[
              styles.text,
              { color: theme === "light" ? "black" : "white" },
            ]}
          >
            SIGNUP
          </Text>
        </Pressable>
        <Animated.View
          style={[
            styles.bar,
            {
              width: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [loginWidth + 8, signupWidth + 8],
              }),
              transform: [
                {
                  translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [barStart - 4, loginWidth + 30 - 4],
                  }),
                },
              ],
            },
            { backgroundColor: mainColor },
          ]}
        />
      </View>
      {mode === "login" ? <LoginForm /> : <SignupForm />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    marginTop: 60,
    columnGap: 30,
    alignItems: "center",
  },
  button: {},
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
  bar: {
    position: "absolute",
    bottom: -3,
    height: 3,

    borderRadius: 2,
  },
});

export default Forms;
