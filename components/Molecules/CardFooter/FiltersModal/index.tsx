import {
  BottomPopup,
  BottomPopupContent,
  BottomPopupNotification,
} from "@/components/BottomPopup";
import { RangeDataChoose } from "@/components/Molecules/RangeDataChoose";
import { View } from "react-native";

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
      <BottomPopupContent>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <RangeDataChoose />
        </View>
      </BottomPopupContent>
    </BottomPopup>
  );
};
