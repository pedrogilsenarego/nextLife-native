import { useTheme } from "@/providers/ThemeContext";
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, PanResponder } from "react-native";

const useMainLayout = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [componentHeight, setComponentHeight] = useState<number>(0);
  const { theme, mainColor } = useTheme();
  const componentRef = useRef(null);
  const width = Dimensions.get("window").width;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    animateScale();
  }, [openModal]);

  const animateScale = () => {
    Animated.spring(scaleAnim, {
      toValue: openModal ? 1 : 0,

      useNativeDriver: true,
    }).start();
  };

  const scaleInterpolate = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.92],
  });
  const animatedStyle = {
    transform: [{ scale: scaleInterpolate }],
  };
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
      if (!openModal) {
        if (gesture.dy < 0) {
          scaleAnim.setValue(Math.min(Math.abs(gesture.dy / 100), 4));
        }
      } else {
        scaleAnim.setValue(Math.min(1 - gesture.dy / 100, 4));
      }
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

  return {
    width,
    animatedStyle,
    mainColor,
    pan,
    panResponder,
    componentRef,
    setComponentHeight,
    setOpenModal,
    runSpringAnimation,
    openModal,
    theme,
  };
};

export default useMainLayout;
