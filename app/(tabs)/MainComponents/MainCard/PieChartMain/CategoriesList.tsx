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
        title={selectedCategory || ""}
        openModal={!!selectedCategory}
        fullHeight
        onClose={() => setSelectedCategory(null)}
      >
        <BottomPopupContent>
          <CategoryContent />
        </BottomPopupContent>
      </BottomPopup>
    </>
  );
};
