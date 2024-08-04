import { defaultCategories } from "@/app/(tabs)/MainComponents/BottomCard/constants";
import { BottomPopup } from "@/components/BottomPopup";
import { useApp } from "@/providers/AppProvider";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";

export const CategoriesFilter = () => {
  const { mainColor } = useTheme();
  const { categoryFilter, updateCategoryFilter } = useApp();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Pressable onPress={() => setOpen(true)}>
        {categoryFilter.length > 0 ? (
          <View style={{ flexDirection: "row", columnGap: 6 }}>
            {categoryFilter.map((category, index) => {
              return (
                <View
                  key={index}
                  style={{
                    padding: 6,
                    paddingVertical: 2,
                    borderRadius: 6,
                    backgroundColor: `${mainColor}66`,
                  }}
                >
                  <Text style={{ color: "white" }}>{category}</Text>
                </View>
              );
            })}
          </View>
        ) : (
          <Text>No Categories filtered</Text>
        )}
      </Pressable>
      <BottomPopup
        title="Categories"
        openModal={open}
        onClose={() => setOpen(false)}
        fullHeight
      >
        <FlatList
          data={defaultCategories}
          renderItem={(category) => (
            <Pressable
              key={category.index}
              onPress={() => updateCategoryFilter(category.item.value)}
              style={{
                paddingVertical: 14,
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                borderBottomColor: Colors.lightGray,
                flexDirection: "row",
                alignItems: "center",
                columnGap: 8,
              }}
            >
              <Text style={{ fontSize: 16 }}>{category.item.label}</Text>
              {categoryFilter.includes(category.item.value) && (
                <AntDesign name="check" size={20} color={mainColor} />
              )}
            </Pressable>
          )}
        />
      </BottomPopup>
    </>
  );
};
