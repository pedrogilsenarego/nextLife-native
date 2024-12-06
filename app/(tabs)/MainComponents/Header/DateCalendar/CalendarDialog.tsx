import { Card } from "@/components/Atoms/Card";
import { Container } from "@/components/Atoms/Container";
import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { useSchedulleMetrics } from "@/hooks/SchedulleMetrics/useSchedulleMetrics";
import { Text, View } from "react-native";

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
            {getMonthEvents().map((month, index) => {
              if (month.events.length <= 0) return;
              return (
                <View key={index}>
                  <Text key={index} style={{ fontWeight: "600" }}>
                    {month.monthLabel} - {month.year}
                  </Text>
                  <View style={{ marginTop: 10 }}>
                    {month.events.map((event, index) => {
                      return (
                        <Container
                          key={index}
                          containerStyles={{ flexDirection: "column" }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <Text style={{ fontWeight: 600 }}>
                              {event.category}
                            </Text>
                            <Text style={{ fontWeight: 600 }}>
                              {event.value} €
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <Text>{event.title}</Text>
                            <Text>{event.date.toDateString()}</Text>
                          </View>
                        </Container>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </BottomPopupContent>
    </BottomPopup>
  );
};

export default CalendarDialog;
