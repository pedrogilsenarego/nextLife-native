import { Colors, useTheme } from "@/providers/ThemeContext";
import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";

type Props = {
  size?: number;
};

export const IconCard: React.FC<Props> = ({ size }) => {
  const { theme, mainColor } = useTheme();
  return (
    <View
      style={{
        padding: size ? size / 4 : 6,
        borderRadius: 6,
        borderWidth: 1,
        backgroundColor: theme === "light" ? Colors.white : Colors.black,
        borderColor: Colors.lightGray,
        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
      }}
    >
      <AntDesign
        color={theme === "light" ? mainColor : Colors.greenPuke}
        size={size || 30}
        name="gitlab"
      />
    </View>
  );
};
