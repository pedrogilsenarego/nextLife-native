import { useState } from "react";
import { Pressable, Text } from "react-native";
import CalendarDialog from "./CalendarDialog";

const DateCalendar: React.FC = () => {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const currentDate = new Date();
  const monthInLetters = currentDate.toLocaleString("default", {
    month: "long",
  });
  const formattedDate = `${currentDate.getDate()}, ${monthInLetters} ${currentDate.getFullYear()}`;
  return (
    <>
      <Pressable onPress={() => setOpenCalendar(true)}>
        <Text
          style={{
            marginTop: 60,
            color: "whitesmoke",
          }}
        >
          {formattedDate}
        </Text>
      </Pressable>
      {openCalendar && (
        <CalendarDialog onClose={() => setOpenCalendar(false)} />
      )}
    </>
  );
};

export default DateCalendar;
