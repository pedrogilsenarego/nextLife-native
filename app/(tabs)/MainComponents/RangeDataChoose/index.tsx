import { View, Text } from "react-native";

export const RangeDataChoose: React.FC = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        columnGap: 15,

        paddingHorizontal: 10,
        paddingVertical: 4,
      }}
    >
      <Text style={{ fontWeight: "bold" }}>May</Text>
      <Text>April</Text>
      <Text>March</Text>
      <Text>3 M</Text>
      <Text>6 M</Text>
      <Text>1 Y</Text>
      <Text>3 Y</Text>
    </View>
  );
};
