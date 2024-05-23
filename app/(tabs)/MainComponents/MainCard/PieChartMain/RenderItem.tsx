import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { Colors, useTheme } from "@/providers/ThemeContext";

interface Data {
  category: string;
  percentage: number;
  color: string;
  amount: number;
}

type Props = {
  item: Data;
  index: number;
};

const RenderItem = ({ item, index }: Props) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    contentContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 8,
      paddingHorizontal: 10,
      width: "100%",
      borderBottomWidth: theme === "light" ? 1 : 0,
      borderColor: Colors.lightGray,
    },
    color: {
      width: 20,
      height: 20,
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: 10,
            alignItems: "center",
          }}
        >
          <View style={[styles.color, { backgroundColor: item.color }]} />
          <Text
            style={{
              color: theme === "light" ? Colors.black : "white",
              fontSize: 16,
              textTransform: "capitalize",
            }}
          >
            {item.category}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              color: theme === "light" ? Colors.black : "white",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {item.percentage}%
          </Text>
          <Text
            style={{
              color: theme === "light" ? Colors.black : "white",
              fontSize: 12,
            }}
          >
            {item.amount}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default RenderItem;
