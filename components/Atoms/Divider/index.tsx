import { useTheme } from "@/providers/ThemeContext";
import { View } from "react-native";

export const Divider = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        height: 1,
        backgroundColor: theme === "dark" ? "#ffffff40" : "#0000000D",
        width: "100%",
      }}
    />
  );
};
