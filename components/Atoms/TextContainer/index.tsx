import { Colors } from "@/providers/ThemeContext";
import { View, ViewProps, StyleSheet } from "react-native";

type Props = {} & ViewProps;

export const TextContainer: React.FC<Props> = (props) => {
  return (
    <View {...props} style={[styles.container, props.style]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${Colors.pearlWhite}66`,
    display: "flex",
    flexDirection: "row",

    justifyContent: "space-between",
    borderRadius: 4,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
  },
});
