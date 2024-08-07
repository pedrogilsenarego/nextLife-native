import {
  defaultCategories,
  defaultIncomesCategories,
} from "@/app/(tabs)/MainComponents/BottomCard/constants";
import { BottomPopup } from "@/components/BottomPopup";
import { useApp } from "@/providers/AppProvider";
import { Colors, useTheme } from "@/providers/ThemeContext";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";

type Props = {
  mode: "expenses" | "incomes";
};

export const CategoriesFilter = (props: Props) => {
  const { mainColor } = useTheme();
  const {
    categoryFilterExpenses,
    updateCategoryFilterExpenses,
    categoryFilterIncomes,
    updateCategoryFilterIncomes,
  } = useApp();
  const [open, setOpen] = useState<boolean>(false);
  const data =
    props.mode === "expenses" ? categoryFilterExpenses : categoryFilterIncomes;
  const defaultData =
    props.mode === "expenses"
      ? defaultCategories
      : props.mode === "incomes"
      ? defaultIncomesCategories
      : defaultCategories;
  return (
    <>
      <Pressable onPress={() => setOpen(true)}>
        {data.length > 0 ? (
          <View style={{ flexDirection: "row", columnGap: 6 }}>
            {data.map((category, index) => {
              return (
                <View
                  key={index}
                  style={{
                    padding: 8,
                    paddingVertical: 2,
                    borderRadius: 6,
                    backgroundColor: `${mainColor}66`,
                  }}
                >
                  <Text style={{ color: "white", textTransform: "capitalize" }}>
                    {category}
                  </Text>
                </View>
              );
            })}
          </View>
        ) : (
          <Text>No Categories filtered</Text>
        )}
      </Pressable>
      <BottomPopup
        title={`${
          props.mode === "expenses" ? "Expenses" : "Incomes"
        } Categories`}
        openModal={open}
        onClose={() => setOpen(false)}
        fullHeight
      >
        <FlatList
          data={defaultData}
          renderItem={(category) => (
            <Pressable
              key={category.index}
              onPress={() => {
                props.mode === "expenses"
                  ? updateCategoryFilterExpenses(category.item.value)
                  : updateCategoryFilterIncomes(category.item.value);
              }}
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
              {category.item.icon && (
                <View
                  style={{
                    backgroundColor: mainColor,
                    height: 30,
                    width: 30,
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {!category.item.variation ? (
                    <AntDesign
                      color={Colors.white}
                      name={category.item.icon as any}
                      size={18}
                    />
                  ) : category.item.variation === "materialIcons" ? (
                    <MaterialIcons
                      name={category.item.icon as any}
                      color={Colors.white}
                      size={18}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name={category.item.icon as any}
                      color={Colors.white}
                      size={18}
                    />
                  )}
                </View>
              )}
              <Text style={{ fontSize: 18, color: Colors.gray }}>
                {category.item.label}
              </Text>
              {data.includes(category.item.value) && (
                <AntDesign name="check" size={24} color={mainColor} />
              )}
            </Pressable>
          )}
        />
      </BottomPopup>
    </>
  );
};
