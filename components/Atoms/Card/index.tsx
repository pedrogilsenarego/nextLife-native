import { Colors, useTheme } from "@/providers/ThemeContext";
import { View } from "react-native";

type Props = {
  children: React.ReactNode;
};

export const Card: React.FC<Props> = ({ children }) => {
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
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingTop: 90,
        paddingBottom: 12,
      }}
    >
      {children}
    </View>
  );
};
