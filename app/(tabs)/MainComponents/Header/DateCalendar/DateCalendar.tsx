import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import CalendarDialog from "./CalendarDialog";
import React from "react";
import { Colors } from "@/providers/ThemeContext";
import { useSchedulleMetrics } from "@/hooks/SchedulleMetrics/useSchedulleMetrics";

const DateCalendar: React.FC = () => {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const { getMonthEvents } = useSchedulleMetrics();
  const monthEvents = getMonthEvents();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const monthInLetters = currentDate.toLocaleString("default", {
    month: "long",
  });

  const hasEventsForCurrentMonth = monthEvents.some(
    (event) =>
      event.year === currentYear &&
      event.month === currentMonth &&
      event.events.length > 0
  );

  const formattedDate = `${currentDate.getDate()}, ${monthInLetters} ${currentDate.getFullYear()}`;
  return (
    <>
      <Pressable
        style={{
          marginTop: 30,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          columnGap: 2,
        }}
        onPress={() => setOpenCalendar(true)}
      >
        <Text
          style={{
            marginTop: 6,
            color: "whitesmoke",
          }}
        >
          {formattedDate}
        </Text>
        {!hasEventsForCurrentMonth && (
          <View
            style={{
              backgroundColor: "red",
              marginTop: 7,
              borderWidth: 1,
              borderColor: Colors.lightGray,
              borderRadius: 50,
              width: 7,
              height: 7,
            }}
          />
        )}
      </Pressable>
      {openCalendar && (
        <CalendarDialog
          onClose={() => setOpenCalendar(false)}
          monthEvents={monthEvents}
        />
      )}
    </>
  );
};

export default DateCalendar;
