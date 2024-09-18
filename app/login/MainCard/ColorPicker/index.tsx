import { View, Text } from "react-native";
import SelectColorItem from "./SelectColorItem";

const ColorPicker = () => {
  return (
    <View style={{ display: "flex", flexDirection: "row", columnGap: 6 }}>
      <SelectColorItem color={"purple"} />
      <SelectColorItem color={"nightBlue"} />
      <SelectColorItem color={"orangeRed"} />
    </View>
  );
};

export default ColorPicker;
