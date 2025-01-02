import { useTheme } from "@/providers/ThemeContext";
import { View, ViewProps } from "react-native";

type Props = {} & ViewProps;

export const Divider: React.FC<Props> = (props) => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        {
          height: 1,
          backgroundColor: theme === "dark" ? "#ffffff40" : "#0000000D",
          width: "100%",
        },
        props.style,
      ]}
    />
  );
};
