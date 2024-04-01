import { Colors, useTheme, ColorsProp } from "@/providers/ThemeContext";
import { Pressable } from "react-native";
import { Text, View } from "react-native";

type Props = {
  color: ColorsProp;
};

const SelectColorItem = ({ color }: Props) => {
  const { changeMainColor } = useTheme();
  return (
    <Pressable
      onPress={() => changeMainColor(color)}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 12,
      }}
    >
      <View
        style={{
          height: 30,
          width: 30,
          backgroundColor: Colors[color],
          borderRadius: 15,
        }}
      />
    </Pressable>
  );
};

export default SelectColorItem;
