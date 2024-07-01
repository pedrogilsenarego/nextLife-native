import { Colors, useTheme } from "@/providers/ThemeContext";
import { View } from "react-native";

type Props = {
  children: React.ReactNode;
  footer?: boolean;
};

export const Card: React.FC<Props> = ({ children, footer }) => {
  const { theme } = useTheme();
  return (
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
  );
};
