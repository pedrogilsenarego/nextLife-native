import { useBusinessIcons } from "@/constants/useBusinessIcons";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { AntDesign } from "@expo/vector-icons";
import { CSSProperties } from "react";
import { View, ViewStyle } from "react-native";

type Props = {
  size?: number;

  containerStyles?: ViewStyle;
  iconId?: number;
};

export const IconCard: React.FC<Props> = ({
  size,
  containerStyles,
  iconId,
}) => {
  const { theme, mainColor } = useTheme();
  const businessIcons = useBusinessIcons({ size: size || 30 });
  const icon = businessIcons[iconId || 0].icon;
  return (
    <View
      style={{
        padding: size ? size / 4 : 6,
        borderRadius: size ? size / 4 : 6,
        borderWidth: 1,
        backgroundColor: theme === "light" ? Colors.white : Colors.black,
        borderColor: Colors.lightGray,
        ...containerStyles,
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 1,
        //   height: 1,
        // },
        // shadowOpacity: 0.1,
        // shadowRadius: 1,
        // elevation: 2,
      }}
    >
      {icon}
    </View>
  );
};