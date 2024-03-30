import React, { useState, useRef } from "react";
import { Pressable, View, Text, Animated, StyleSheet } from "react-native";

type Props = {
  setMode: (mode: "login" | "signup") => void;
  mode: "login" | "signup";
};

const StatusButtons = ({ setMode, mode }: Props) => {
  const [loginWidth, setLoginWidth] = useState(0);
  const [signupWidth, setSignupWidth] = useState(0);
  const [barStart, setBarStart] = useState(0);
  const animation = useRef(
    new Animated.Value(mode === "login" ? 0 : 1)
  ).current;

  const handlePress = (selectedMode: "login" | "signup") => {
    Animated.timing(animation, {
      toValue: selectedMode === "login" ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
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
    <View style={styles.container}>
      <Pressable
        onPress={() => handlePress("login")}
        style={styles.button}
        onLayout={handleLoginLayout}
      >
        <Text style={styles.text}>LOGIN</Text>
      </Pressable>
      <Pressable
        onPress={() => handlePress("signup")}
        style={styles.button}
        onLayout={handleSignupLayout}
      >
        <Text style={styles.text}>SIGNUP</Text>
      </Pressable>
      <Animated.View
        style={[
          styles.bar,
          {
            width: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [loginWidth, signupWidth],
            }),
            transform: [
              {
                translateX: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [barStart, loginWidth + 30],
                }),
              },
            ],
          },
        ]}
      />
    </View>
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
    backgroundColor: "orangered",
    borderRadius: 2,
  },
});

export default StatusButtons;
