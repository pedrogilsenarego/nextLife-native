import { Colors, useTheme } from "@/providers/ThemeContext";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Animated, Easing, Pressable, View } from "react-native";

type Props = {
  handleMoveCarousel: (index: number) => void;
};
export const StateSelecter: React.FC<Props> = ({ handleMoveCarousel }) => {
  const BUTTON_WIDTH = 26;
  const BUTTON_GAP = 2;
  const animationLeft = useRef(new Animated.Value(0)).current;
  const [selectedStatus, setSelectedStatus] = useState<
    "initial" | "line" | "pie"
  >("initial");
  const { theme, mainColor, contrastColor } = useTheme();
  const handlePress = (button: any, index: number) => {
    handleMoveCarousel(index);
    setSelectedStatus(button);

    const totalLeft = BUTTON_WIDTH * index + (BUTTON_GAP + 4) * index;
    console.log(totalLeft);
    Animated.timing(animationLeft, {
      toValue: totalLeft,
      duration: 200,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();
  };

  return (
    <View
      style={{
        backgroundColor: theme === "light" ? Colors.black : "#ffffff1A",
        width: "auto",
        borderRadius: 24,
        flexDirection: "row",
        display: "flex",
        padding: 0,
        position: "relative",
        columnGap: BUTTON_GAP,
      }}
    >
      <Animated.View
        style={{
          left: 2,
          top: 2,
          position: "absolute",
          backgroundColor: mainColor,
          borderRadius: 13,
          height: BUTTON_WIDTH,
          width: BUTTON_WIDTH,
          transform: [
            {
              translateX: animationLeft,
            },
          ],
        }}
      />
      <Pressable
        onPress={() => {
          handlePress("initial", 0);
        }}
        style={{
          //backgroundColor: mainColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 18,
          padding: 8,
        }}
      >
        <Entypo
          name="home"
          color={
            theme === "light"
              ? selectedStatus === "initial"
                ? "white"
                : "#ffffff66"
              : contrastColor
          }
          size={14}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          handlePress("line", 1);
        }}
        style={{
          //backgroundColor: mainColor,
          borderRadius: 18,
          padding: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AntDesign
          name="dotchart"
          color={
            theme === "light"
              ? selectedStatus === "line"
                ? "white"
                : "#ffffff66"
              : contrastColor
          }
          size={14}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          handlePress("pie", 2);
        }}
        style={{
          borderRadius: 18,
          padding: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AntDesign
          name="piechart"
          color={
            theme === "light"
              ? selectedStatus === "pie"
                ? "white"
                : "#ffffff66"
              : contrastColor
          }
          style={{ opacity: 0.7 }}
          size={14}
        />
      </Pressable>
    </View>
  );
};
