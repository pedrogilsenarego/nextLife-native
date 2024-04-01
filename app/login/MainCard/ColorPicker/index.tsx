import { View, Text } from "react-native";
import SelectColorItem from "./SelectColorItem";

const ColorPicker = () => {
  return (
    <View style={{ display: "flex", rowGap: 8 }}>
      <Text
        style={{
          color: "gray",
          textAlign: "center",
          fontSize: 20,
          transform: [{ rotateY: "180deg" }],
        }}
      >
        Choose your Color
      </Text>
      <View style={{ display: "flex", flexDirection: "row", columnGap: 10 }}>
        <SelectColorItem color={"black"} />
        <SelectColorItem color={"orangeRed"} />
        <SelectColorItem color={"fuchsia"} />
        <SelectColorItem color={"tealc"} />
        <SelectColorItem color={"purple"} />
      </View>
    </View>
  );
};

export default ColorPicker;
