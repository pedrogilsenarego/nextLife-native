import { View, Text } from "react-native";
import { useSelectedCategory } from "./CategoriesContext";
import Content from "../Content";

export const CategoryContent = () => {
  const { selectedCategory } = useSelectedCategory();
  return (
    <View>
      <Text>{selectedCategory}</Text>
      <Content selectedCategory={selectedCategory!} />
    </View>
  );
};
