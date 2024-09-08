import {
  BottomPopup,
  BottomPopupContent,
  BottomPopupNotification,
} from "@/components/BottomPopup";
import { RangeDataChoose } from "@/components/Molecules/RangeDataChoose";
import { View, Text } from "react-native";
import { BusinessFilter } from "../../BusinessFilter";
import { CategoriesFilter } from "./CategoriesFilter";
import { Card } from "@/components/Atoms/Card";
import { Container } from "@/components/Atoms/Container";

type Props = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};

export const FiltersModal: React.FC<Props> = (props) => {
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
      <BottomPopupContent fullHeight>
        <RangeDataChoose />

        <Container>
          <View style={{ flex: 1, paddingVertical: 20, rowGap: 15 }}>
            <View style={{ rowGap: 6 }}>
              <Text style={{ fontWeight: 600, fontSize: 16 }}>Businesses</Text>
              <BusinessFilter size={40} gap={6} />
            </View>
            <View style={{ rowGap: 5 }}>
              <CategoriesFilter mode="expenses" />

              <CategoriesFilter mode="incomes" />
            </View>
          </View>
        </Container>
      </BottomPopupContent>
    </BottomPopup>
  );
};
