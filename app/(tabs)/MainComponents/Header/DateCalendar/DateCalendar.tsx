import { Text } from "react-native";

const DateCalendar: React.FC = () => {
  const currentDate = new Date();
  const monthInLetters = currentDate.toLocaleString("default", {
    month: "long",
  });
  const formattedDate = `${currentDate.getDate()}, ${monthInLetters} ${currentDate.getFullYear()}`;
  return (
    <>
      <Text
        style={{
          marginTop: 6,
          color: "whitesmoke",
        }}
      >
        {formattedDate}
      </Text>
    </>
  );
};

export default DateCalendar;
