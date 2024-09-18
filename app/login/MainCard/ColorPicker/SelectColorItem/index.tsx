import { Colors, useTheme, ColorsProp } from "@/providers/ThemeContext";
import { Pressable } from "react-native";
import { Text, View } from "react-native";

type Props = {
  color: ColorsProp;
};

const SelectColorItem = ({ color }: Props) => {
  const { changeMainColor, mainColor } = useTheme();

  return (
    <Pressable
      onPress={() => changeMainColor(color)}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 12,
        borderWidth: 2,
        borderColor: mainColor === Colors[color] ? "gray" : "transparent",
        borderRadius: 59,
        padding: 2,
      }}
    >
      <View
        style={{
          height: 26,

          width: 26,
          backgroundColor: Colors[color],
          borderRadius: 15,
        }}
      />
    </Pressable>
  );
};

export default SelectColorItem;
