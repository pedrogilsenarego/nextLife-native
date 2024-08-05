import { View, Text } from "react-native";
import SelectColorItem from "./SelectColorItem";

type Props = {
  rotate?: boolean;
};

const ColorPicker = ({ rotate = false }: Props) => {
  return (
    <View style={{ display: "flex", rowGap: 8 }}>
      <Text
        style={{
          color: "gray",
          textAlign: "center",
          fontSize: 20,
          transform: rotate ? [{ rotateY: "180deg" }] : undefined,
        }}
      >
        Choose your Color
      </Text>
      <View style={{ display: "flex", flexDirection: "row", columnGap: 10 }}>
        <SelectColorItem color={"black"} />

        <SelectColorItem color={"fuchsia"} />

        <SelectColorItem color={"purple"} />
        <SelectColorItem color={"nightBlue"} />

        <SelectColorItem color={"gray"} />
      </View>
    </View>
  );
};

export default ColorPicker;
