import { View, Text, ScrollView } from "react-native";
import { useSelectedCategory } from "./CategoriesContext";
import Content from "../Content";

export const CategoryContent = () => {
  const { selectedCategory } = useSelectedCategory();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      style={{
        borderRadius: 8,
        marginTop: 50,
        position: "relative",
        height: "100%",
      }}
    >
      <Text>{selectedCategory}</Text>
      <Content selectedCategory={selectedCategory!} />
    </ScrollView>
  );
};
