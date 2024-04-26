import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { useTheme } from "@/providers/ThemeContext";

interface Data {
  category: string;
  percentage: number;
  color: string;
}

type Props = {
  item: Data;
  index: number;
};

const RenderItem = ({ item, index }: Props) => {
  const { contrastColor } = useTheme();
  const styles = StyleSheet.create({
    contentContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: 20,
    },
    color: {
      width: 60,
      height: 60,
      borderRadius: 4,
    },
    text: {
      fontSize: 22,
      fontWeight: "bold",
      color: "black",
    },
  });
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 200)}
      exiting={FadeOutDown}
    >
      <View style={styles.contentContainer}>
        <View style={[styles.color, { backgroundColor: item.color }]} />
        <Text style={styles.text}>{item.percentage}%</Text>
        <Text style={styles.text}>${item.category}</Text>
      </View>
    </Animated.View>
  );
};

export default RenderItem;
