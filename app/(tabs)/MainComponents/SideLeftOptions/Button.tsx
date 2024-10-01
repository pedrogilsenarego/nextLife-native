import AntDesign from "@expo/vector-icons/build/AntDesign";
import { BlurView } from "expo-blur";
import { Pressable, Text, StyleSheet, Dimensions } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
};

const { width } = Dimensions.get("window");
const paddingH = 0;
const interMargin = 7;
const itemSize = (width - 50 - 40 - paddingH * 2) / 3 - interMargin;
const iconSize = itemSize / 2;
const textSize = itemSize / 8;

export const Button: React.FC<Props> = (props) => {
  return (
    <Pressable onPress={props.onPress}>
      <BlurView intensity={100} style={styles.blurContainer}>
        <AntDesign color={"whitesmoke"} size={iconSize} name="home" />
        <Text style={styles.text}>{props.label}</Text>
      </BlurView>
    </Pressable>
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

  text: {
    color: "whitesmoke",
    fontSize: textSize,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
