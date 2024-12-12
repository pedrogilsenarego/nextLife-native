import { useRealEstate } from "@/hooks/RealEstate/realEstate.hooks";
import { View, FlatList, Text } from "react-native";
import { PropertyItem } from "./PropertyItem";
import { Colors } from "@/providers/ThemeContext";

export const PropertiesContent = () => {
  const properties = useRealEstate();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
    >
      {!properties.isLoading ? (
        <FlatList
          data={properties.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PropertyItem property={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      ) : (
        <Text>Loading properties...</Text>
      )}
    </View>
  );
};
