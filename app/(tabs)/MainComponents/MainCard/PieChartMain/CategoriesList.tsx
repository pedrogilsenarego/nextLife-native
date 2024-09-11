import { View, Text } from "react-native";
import RenderItem from "./RenderItem";
import { Data } from "./PieChartMain";
import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { useSelectedCategory } from "./CategoriesContext";
import { Colors } from "@/providers/ThemeContext";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import { FiltersButton } from "@/components/Molecules/CardFooter/FiltersButton";
import Content from "../Content";

type Props = {
  dataToRender: Data[] | null;
  numberOfMonths: number;
};

export const CategoriesList = (props: Props) => {
  const { selectedCategory, setSelectedCategory } = useSelectedCategory();
  const expenses = useExpenses();
  const incomes = useIncomes();
  return (
    <>
      <View style={{ marginTop: 6, marginBottom: 30 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {props.dataToRender?.map((item, index) => {
            return item.percentage <= 0 ? null : (
              <RenderItem
                item={item}
                key={index}
                index={index}
                numberOfMonths={props.numberOfMonths}
              />
            );
          })}
        </View>
      </View>
      <BottomPopup
        bgColor
        title={selectedCategory || ""}
        openModal={!!selectedCategory}
        fullHeight
        onClose={() => setSelectedCategory(null)}
      >
        <BottomPopupContent
          styles={{
            paddingHorizontal: 0,
            paddingVertical: 0,
            paddingBottom: 0,
          }}
        >
          <View
            style={{
              paddingBottom: 10,

              flexGrow: 1,
              height: "auto",
              flex: 1,
            }}
          >
            <View
              style={{
                marginHorizontal: 6,
                backgroundColor: Colors.pearlWhite,
                height: "100%",
                flex: 1,
                flexGrow: 1,
                paddingVertical: 15,

                borderRadius: 6,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.25,
                shadowRadius: 1,
                elevation: 2,
              }}
            >
              <Content selectedCategory={selectedCategory!} />
            </View>
          </View>
          <View
            style={{
              height: 50,

              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 14,
              alignItems: "flex-start",
            }}
          >
            <View style={{ width: "30%" }}></View>
            <View
              style={{
                width: "40%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.pearlWhite,
                  fontSize: 10,
                  lineHeight: 12,
                }}
              >
                {expenses?.data?.length} expenses
              </Text>
              <Text
                style={{
                  color: Colors.pearlWhite,
                  fontSize: 10,
                  lineHeight: 12,
                }}
              >
                {incomes?.data?.length} incomes
              </Text>
            </View>
            <View
              style={{
                width: "30%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <FiltersButton />
            </View>
          </View>
        </BottomPopupContent>
      </BottomPopup>
    </>
  );
};
