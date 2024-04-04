import React, { useRef, useState } from "react";
import { Animated, PanResponder, View, Text, Pressable } from "react-native";
import Info from "../Info";
import { useTheme } from "@/providers/ThemeContext";

const BottomCard = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [componentHeight, setComponentHeight] = useState<number>(0);
  const { theme } = useTheme();
  const componentRef = useRef(null);
  const [pan] = useState(new Animated.ValueXY());
  const position = -(componentHeight - 110);

  const runSpringAnimation = (toValueX: number, toValueY: number) => {
    return Animated.spring(pan, {
      toValue: { x: toValueX, y: toValueY },
      useNativeDriver: false,
    }).start();
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      pan.setValue({ x: 0, y: openModal ? position + gesture.dy : gesture.dy });
    },
    onPanResponderRelease: (_, gesture) => {
      if (!openModal) {
        if (-gesture.dy > 60 || -gesture.dy === 0) {
          setOpenModal(true);
          runSpringAnimation(0, position);
        } else runSpringAnimation(0, 0);
      } else {
        if (Math.abs(gesture.dy) > 40) {
          setOpenModal(false);
          runSpringAnimation(0, 0);
        } else runSpringAnimation(0, position);
      }
    },
  });

  return (
    <Animated.View style={[{ transform: pan.getTranslateTransform() }]}>
      <View {...panResponder.panHandlers} style={{ height: "100%" }}>
        <View
          ref={componentRef}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setComponentHeight(height);
          }}
          style={{
            backgroundColor: theme === "light" ? "white" : "black",
            marginHorizontal: 4,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            shadowColor: "#000",

            paddingBottom: 100,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, // Android only
          }}
        >
          <Info />

          <View style={{ width: "100%", paddingHorizontal: 30 }}>
            <Text style={{ marginTop: 20, fontWeight: "600" }}>
              Version (1.0.0)
            </Text>
            <Text style={{ marginTop: 5 }}>
              &#183; Adding Expenses and Incomes
            </Text>
            <Text>&#183; Checking main Metrics</Text>
            <Text>&#183; Login, Logout and Register New User</Text>
            <Text>&#183; Change Main Color</Text>
            <Text>&#183; Change Theme</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default BottomCard;
