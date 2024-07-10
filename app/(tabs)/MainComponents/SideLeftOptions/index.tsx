import {
  Pressable,
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { AntDesign } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const paddingH = 15;
const itemSize = (width - 40 - paddingH * 2) / 3;
const iconSize = itemSize / 2;

export const SideLeftOptions = () => {
  const data = [
    {
      id: "1",
      component: (
        <Pressable>
          <BlurView intensity={100} style={styles.blurContainer}>
            <AntDesign color={"whitesmoke"} size={iconSize} name="setting" />
            <Text style={styles.text}>Settings</Text>
          </BlurView>
        </Pressable>
      ),
    },
    {
      id: "2",
      component: (
        <Pressable>
          <BlurView intensity={100} style={styles.blurContainer}>
            <AntDesign color={"whitesmoke"} size={iconSize} name="setting" />
            <Text style={styles.text}>Settings</Text>
          </BlurView>
        </Pressable>
      ),
    },
    {
      id: "3",
      component: (
        <Pressable>
          <BlurView intensity={100} style={styles.blurContainer}>
            <AntDesign color={"whitesmoke"} size={iconSize} name="setting" />
            <Text style={styles.text}>Settings</Text>
          </BlurView>
        </Pressable>
      ),
    },
    {
      id: "4",
      component: (
        <Pressable>
          <BlurView intensity={100} style={styles.blurContainer}>
            <AntDesign color={"whitesmoke"} size={iconSize} name="setting" />
            <Text style={styles.text}>Settings</Text>
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
        numColumns={3}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Animated.View
            style={styles.itemContainer}
            entering={FadeInDown.delay(index * 150)}
            exiting={FadeOutDown}
          >
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
    margin: 5,
  },
  text: {
    color: "whitesmoke",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
