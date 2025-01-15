import { Container } from "@/components/Atoms/Container";
import { SchedulleEvent } from "@/hooks/SchedulleMetrics/SchedulleMetrics.types";
import React from "react";
import { useEffect, useState } from "react";
import { Pressable, View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = {
  i: number;
  event: SchedulleEvent;
};

export const CalendarDialogItem: React.FC<Props> = (props) => {
  const [showContent, setShowContent] = useState<boolean>(false);

  const contentHeight = useSharedValue(0);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  useEffect(() => {
    contentHeight.value = withTiming(showContent ? measuredHeight : 0, {
      duration: 300,
    });
  }, [showContent, measuredHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: contentHeight.value,
    overflow: "hidden",
  }));

  let contentToMeasure: any = null;

  if (!contentToMeasure && props.event.content) {
    contentToMeasure = props.event.content;
  }
  return (
    <>
      <Pressable key={props.i} onPress={() => setShowContent(!showContent)}>
        <Container containerStyles={{ flexDirection: "column" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={{ fontWeight: "600" }}>{props.event.category}</Text>
            <Text style={{ fontWeight: "600" }}>
              {props.event.value || "N.A."} €
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text>{props.event.title}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text>
                {props.event.date.toLocaleDateString("en-En", {
                  month: "short",
                  day: "numeric",
                })}
              </Text>
              {props.event.endDate && (
                <Text>
                  {" "}
                  -{" "}
                  {props.event.endDate?.toLocaleDateString("en-En", {
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
              )}
            </View>
          </View>
          {/* Animated container for the props.event content */}
          {props.event.content && (
            <Animated.View
              style={[animatedStyle, { width: "100%", overflow: "hidden" }]}
            >
              {props.event.content}
            </Animated.View>
          )}
        </Container>
      </Pressable>
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
    </>
  );
};
