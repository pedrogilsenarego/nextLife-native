import { useRealEstate } from "@/hooks/realEstate.hooks";
import { View, FlatList, Text } from "react-native";
import { PropertyItem } from "./PropertyItem";

export const PropertiesContent = () => {
  const properties = useRealEstate();

  return (
    <View style={{ marginHorizontal: 10, flex: 1 }}>
      {!properties.isLoading ? (
        <FlatList
          data={properties.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PropertyItem property={item} />}
          contentContainerStyle={{ paddingVertical: 10 }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      ) : (
        <Text>Loading properties...</Text>
      )}
    </View>
  );
};
