import React from "react";
import {
  Pressable,
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { AntDesign, FontAwesome5, Foundation } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { Colors } from "@/providers/ThemeContext";

const { width } = Dimensions.get("window");
const paddingH = 0;
const interMargin = 7;
const itemSize = (width - 50 - 40 - paddingH * 2) / 3 - interMargin;
const iconSize = itemSize / 2;
const textSize = itemSize / 8;

export const SideLeftOptions = () => {
  const data = [
    {
      id: "1",
      component: (
        <Pressable>
          <BlurView intensity={100} style={styles.blurContainer}>
            <AntDesign color={"whitesmoke"} size={iconSize} name="car" />
            <Text style={styles.text}>Vehicles</Text>
          </BlurView>
        </Pressable>
      ),
    },
    {
      id: "2",
      component: (
        <Pressable>
          <BlurView intensity={100} style={styles.blurContainer}>
            <AntDesign color={"whitesmoke"} size={iconSize} name="adduser" />
            <Text style={styles.text}>Friends</Text>
          </BlurView>
        </Pressable>
      ),
    },
    {
      id: "3",
      component: (
        <Pressable>
          <BlurView intensity={100} style={styles.blurContainer}>
            <AntDesign color={"whitesmoke"} size={iconSize} name="home" />
            <Text style={styles.text}>Properties</Text>
          </BlurView>
        </Pressable>
      ),
    },
    {
      id: "4",
      component: (
        <Pressable>
          <BlurView intensity={100} style={styles.blurContainer}>
            <AntDesign color={"whitesmoke"} size={iconSize} name="calendar" />
            <Text style={styles.text}>Calendar</Text>
          </BlurView>
        </Pressable>
      ),
    },
    {
      id: "5",
      component: (
        <Pressable>
          <BlurView intensity={100} style={styles.blurContainer}>
            <Foundation
              color={"whitesmoke"}
              size={iconSize}
              name="torso-business"
            />
            <Text style={styles.text}>Businesses</Text>
          </BlurView>
        </Pressable>
      ),
    },
    {
      id: "5",
      component: (
        <Pressable>
          <BlurView intensity={100} style={styles.blurContainer}>
            <FontAwesome5 color={"whitesmoke"} size={iconSize} name="coins" />
            <Text style={styles.text}>Deposits</Text>
          </BlurView>
        </Pressable>
      ),
    },
  ];

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: paddingH,
      }}
    >
      <FlatList
        style={{ paddingHorizontal: 5 }}
        numColumns={3}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Animated.View
            style={[styles.itemContainer, { marginTop: index <= 2 ? 10 : 5 }]}
            entering={FadeInDown.delay(index * 150)}
            exiting={FadeOutDown}
          >
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>Soon</Text>
            </View>
            {item.component}
          </Animated.View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    width: "auto",
    aspectRatio: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    rowGap: 5,
    overflow: "hidden",
    borderRadius: 10,
  },
  itemContainer: {
    width: itemSize,
    height: itemSize,

    margin: interMargin,
    position: "relative",
    overflow: "visible", // Ensure badge does not get clipped
  },
  badgeContainer: {
    position: "absolute",
    backgroundColor: Colors.black,

    paddingHorizontal: 6,
    paddingVertical: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    zIndex: 1000,
    right: -6,
    top: -8,
    overflow: "visible", // Ensure badge text does not get clipped
  },
  badgeText: {
    fontSize: 9,
    color: "white",
    lineHeight: 10,
  },
  text: {
    color: "whitesmoke",
    fontSize: textSize,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
