import {
  defaultCategories,
  defaultIncomesCategories,
} from "@/app/(tabs)/MainComponents/BottomCard/constants";
import { SelectorButton } from "@/components/Atoms/SelectorButton";
import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import Button from "@/components/button/ButtonComponent";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import { useApp } from "@/providers/AppProvider";
import { Colors, useTheme } from "@/providers/ThemeContext";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

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
    resetCategoryFilterExpenses,
    resetCategoryFilterIncomes,
    selectAllExpensesCategories,
    selectAllIncomesCategories,
  } = useApp();
  const expenses = useExpenses();
  const incomes = useIncomes();
  const results = props.mode === "expenses" ? expenses : incomes;
  const amountResults = results.data.length;
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
      <SelectorButton
        label={props.mode === "expenses" ? "Expenses" : "Incomes"}
        onPress={() => setOpen(true)}
        value={data}
      />
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
                justifyContent: "space-between",
                columnGap: 8,
              }}
            >
              <View
                style={{
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

                <Text
                  style={{
                    fontSize: 18,
                    color: Colors.gray,
                    fontWeight: data.includes(category.item.value) ? 600 : 400,
                  }}
                >
                  {category.item.label}
                </Text>
              </View>
              {data.includes(category.item.value) && (
                <AntDesign name="check" size={24} color={mainColor} />
              )}
            </Pressable>
          )}
        />

        <View
          style={{
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: Colors.lightGray,
            paddingBottom: 30,
          }}
        >
          <View style={{ width: "100%", alignItems: "center" }}>
            <Text style={{ color: Colors.gray }}>{amountResults} results</Text>
          </View>
          <Button
            onPress={
              props.mode === "expenses"
                ? selectAllExpensesCategories
                : selectAllIncomesCategories
            }
            variant="ghost"
            label={`Select All`}
          />
          {data?.length > 0 && (
            <Button
              onPress={
                props.mode === "expenses"
                  ? resetCategoryFilterExpenses
                  : resetCategoryFilterIncomes
              }
              variant="ghost"
              label={`Reset Filters (${data.length})`}
            />
          )}
          <Button onPress={() => setOpen(false)} label="Apply Filters" />
        </View>
      </BottomPopup>
    </>
  );
};
