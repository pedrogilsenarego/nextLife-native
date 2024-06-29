import { RangeDataChoose } from "@/components/Molecules/RangeDataChoose";
import { View } from "react-native";

export const FilterModal: React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <RangeDataChoose />
    </View>
  );
};
