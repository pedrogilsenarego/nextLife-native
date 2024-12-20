import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { useSchedulleMetrics } from "@/hooks/SchedulleMetrics/useSchedulleMetrics";
import { Pressable, Text, View } from "react-native";
import { CalendarDialogItem } from "./CalendarDialogItem";

type Props = {
  onClose: () => void;
};

const CalendarDialog: React.FC<Props> = (props) => {
  const { getMonthEvents } = useSchedulleMetrics();

  return (
    <BottomPopup
      fullHeight
      title="Calendar"
      openModal={true}
      onClose={props.onClose}
    >
      <BottomPopupContent>
        <View style={{ marginTop: 15 }}>
          <View style={{ flexDirection: "column", gap: 10 }}>
            {getMonthEvents()?.map((month, index) => {
              if (month.events.length <= 0) return null;
              return (
                <Pressable key={index}>
                  <View>
                    <Text style={{ fontWeight: "600" }}>
                      {month.monthLabel} - {month.year}
                    </Text>
                    <View style={{ marginTop: 10, rowGap: 6 }}>
                      {month.events.map((event, i) => {
                        // We'll measure the content once

                        return <CalendarDialogItem event={event} i={i} />;
                      })}
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </BottomPopupContent>
    </BottomPopup>
  );
};

export default CalendarDialog;
