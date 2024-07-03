import { Colors, useTheme } from "@/providers/ThemeContext";
import { AntDesign } from "@expo/vector-icons";
import { CSSProperties } from "react";
import { View, ViewStyle } from "react-native";

type Props = {
  size?: number;
  icon?: React.ReactNode;
  containerStyles?: ViewStyle;
};

export const IconCard: React.FC<Props> = ({ size, icon, containerStyles }) => {
  const { theme, mainColor } = useTheme();
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
      {icon || (
        <AntDesign
          color={theme === "light" ? mainColor : Colors.greenPuke}
          size={size || 30}
          name="gitlab"
        />
      )}
    </View>
  );
};
