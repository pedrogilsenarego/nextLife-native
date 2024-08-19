import { View, Text } from "react-native";
import RenderItem from "./RenderItem";
import { Data } from "./PieChartMain";
import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { useSelectedCategory } from "./CategoriesContext";
import { CategoryContent } from "./CategoryContent";

type Props = {
  dataToRender: Data[] | null;
  numberOfMonths: number;
};

export const CategoriesList = (props: Props) => {
  const { selectedCategory, setSelectedCategory } = useSelectedCategory();
  return (
    <>
      <View style={{ marginTop: 6 }}>
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
            paddingBottom: 50,
          }}
        >
          <View
            style={{
              marginHorizontal: 6,
              backgroundColor: "white",

              paddingVertical: 15,
              paddingHorizontal: 10,
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
            <CategoryContent />
          </View>
        </BottomPopupContent>
      </BottomPopup>
    </>
  );
};
