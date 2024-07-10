import { Colors, useTheme } from "@/providers/ThemeContext";
import { View, StyleSheet } from "react-native";

type Props = {
  children: React.ReactNode;
  footer?: boolean;
  sticky?: boolean;
};

export const Card: React.FC<Props> = ({ children, footer, sticky }) => {
  const { theme, mainColor } = useTheme();
  return (
    <View style={{ position: "relative" }}>
      {sticky && (
        <View style={[styles.stickyContainer, { backgroundColor: mainColor }]}>
          <View style={[styles.innerShadow]} />
        </View>
      )}
      <View
        style={{
          height: "100%",
          backgroundColor: theme === "light" ? Colors.pearlWhite : Colors.black,
          borderRadius: 12,
          marginHorizontal: 4,
          shadowColor: "#000",
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          paddingTop: 90,
          paddingBottom: footer ? 0 : 12,
        }}
      >
        {children}
        {footer && (
          <View
            style={{
              borderTopWidth: 0.5,
              height: 45,
              borderTopColor: theme === "dark" ? "transparent" : Colors.gray,
            }}
          ></View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stickyContainer: {
    position: "absolute",
    zIndex: 1000,
    top: 46,
    right: 4,
    width: 120,
    height: 44,

    borderTopStartRadius: 6,
    borderBottomStartRadius: 6,
  },
  innerShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    height: "auto",
    width: "auto",
    shadowColor: "#000",
    shadowOffset: {
      width: -2, // Adjust for left inner shadow
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // Android elevation for shadow
    borderTopStartRadius: 6,
    borderBottomStartRadius: 6,
  },
});
