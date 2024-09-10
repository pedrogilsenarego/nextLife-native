import {
  BottomPopup,
  BottomPopupContent,
  BottomPopupNotification,
} from "@/components/BottomPopup";
import { RangeDataChoose } from "@/components/Molecules/RangeDataChoose";
import { View, Text } from "react-native";
import { BusinessFilter } from "../../BusinessFilter";
import { CategoriesFilter } from "./CategoriesFilter";

import { Container } from "@/components/Atoms/Container";
import { Colors } from "@/providers/ThemeContext";
import Button from "@/components/button/ButtonComponent";
import { useApp } from "@/providers/AppProvider";

type Props = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};

export const FiltersModal: React.FC<Props> = (props) => {
  const { resetCategoryFilterExpenses, resetCategoryFilterIncomes } = useApp();
  const handleResetFilters = () => {
    resetCategoryFilterExpenses();
    resetCategoryFilterIncomes();
  };
  return (
    <BottomPopup
      title="Filters"
      fullHeight
      openModal={props.openModal}
      onClose={() => props.setOpenModal(false)}
    >
      <BottomPopupNotification
        label={
          "Clicking on a specific card will display data for that item only, overriding the filters. You can still use other filters like category."
        }
      />
      <BottomPopupContent
        fullHeight
        styles={{ backgroundColor: Colors.pearlWhite }}
      >
        <RangeDataChoose />

        <Container>
          <View style={{ width: "100%", rowGap: 15 }}>
            <View style={{ rowGap: 6 }}>
              <Text style={{ fontWeight: 600, fontSize: 16 }}>Businesses</Text>
              <BusinessFilter size={40} gap={6} />
            </View>
            <View style={{ rowGap: 5 }}>
              <CategoriesFilter mode="expenses" />

              <CategoriesFilter mode="incomes" />
            </View>
            <Button
              onPress={handleResetFilters}
              label="Reset filters"
              variant="ghost"
            />
          </View>
        </Container>
      </BottomPopupContent>
    </BottomPopup>
  );
};
