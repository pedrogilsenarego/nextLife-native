import { Card } from "@/components/Atoms/Card";
import { Container } from "@/components/Atoms/Container";
import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { useSchedulleMetrics } from "@/hooks/SchedulleMetrics/useSchedulleMetrics";
import { useState, useEffect, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = {
  onClose: () => void;
};

const CalendarDialog: React.FC<Props> = (props) => {
  const { getMonthEvents } = useSchedulleMetrics();
  const [showContent, setShowContent] = useState<boolean>(false);

  const contentHeight = useSharedValue(0);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  // Animate height when showContent changes
  useEffect(() => {
    // Animate height from 0 to the measured content height (or back)
    contentHeight.value = withTiming(showContent ? measuredHeight : 0, {
      duration: 300,
    });
  }, [showContent, measuredHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: contentHeight.value,
    overflow: "hidden",
  }));

  let contentToMeasure: any = null;

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
                        if (!contentToMeasure && event.content) {
                          contentToMeasure = event.content;
                        }
                        return (
                          <Pressable
                            key={i}
                            onPress={() => setShowContent(!showContent)}
                          >
                            <Container
                              containerStyles={{ flexDirection: "column" }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: "100%",
                                }}
                              >
                                <Text style={{ fontWeight: "600" }}>
                                  {event.category}
                                </Text>
                                <Text style={{ fontWeight: "600" }}>
                                  {event.value || "-"} €
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
                                <View style={{ flexDirection: "row" }}>
                                  <Text>
                                    {event.date.toLocaleDateString("en-En", {
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </Text>
                                  {event.endDate && (
                                    <Text>
                                      {" "}
                                      -{" "}
                                      {event.endDate?.toLocaleDateString(
                                        "en-En",
                                        {
                                          month: "short",
                                          day: "numeric",
                                        }
                                      )}
                                    </Text>
                                  )}
                                </View>
                              </View>
                              {/* Animated container for the event content */}
                              {event.content && (
                                <Animated.View
                                  style={[
                                    animatedStyle,
                                    { width: "100%", overflow: "hidden" },
                                  ]}
                                >
                                  {event.content}
                                </Animated.View>
                              )}
                            </Container>
                          </Pressable>
                        );
                      })}
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* Hidden view to measure content height */}
          {contentToMeasure && (
            <View
              style={{
                position: "absolute",
                top: -9999,
                left: -9999,
              }}
              onLayout={(e) => setMeasuredHeight(e.nativeEvent.layout.height)}
            >
              {contentToMeasure}
            </View>
          )}
        </View>
      </BottomPopupContent>
    </BottomPopup>
  );
};

export default CalendarDialog;
