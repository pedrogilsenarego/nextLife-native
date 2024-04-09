import Button from "@/components/button/ButtonComponent";
import { useTheme } from "@/providers/ThemeContext";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { useState } from "react";
import { View, TextInput, Pressable, Platform, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const DatePicker = () => {
  const [show, setShow] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const { mainColor } = useTheme();
  const formatDate = (rawDate: Date) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDay();

    const newMonth = month < 10 ? `0${month}` : month;
    const newDay = day < 10 ? `0${day}` : day;

    return `${newDay}-${newMonth}-${year}`;
  };

  const toggleDatePicker = () => {
    setShow(!show);
  };
  const onChange = (
    { type }: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    if (type === "set" && selectedDate) {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker(), setDate(currentDate);
      }
    } else {
      toggleDatePicker();
    }
  };
  const confirmIosDate = () => {
    toggleDatePicker();
  };
  return (
    <View>
      {Platform.OS !== "ios" && (
        <Pressable onPress={toggleDatePicker}>
          <TextInput
            value={formatDate(date)}
            style={{
              borderWidth: 2,
              borderColor: "lightGray",
              padding: 10,
              backgroundColor: "transparent",
              height: 50,
              fontSize: 14,
              color: "lightGray",
              borderRadius: 50,
            }}
            placeholder="teste"
            editable={false}
            onPressIn={toggleDatePicker}
          />
        </Pressable>
      )}

      {(show || Platform.OS === "ios") && (
        <RNDateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
          style={{
            height: 120,
            borderWidth: 2,
            borderColor: "gray",
            borderRadius: 30,
          }}
          //maximumDate={}
          //minimumDate={}
        />
      )}
      {/* {show && Platform.OS === "ios" && (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Button onPress={toggleDatePicker} label="Cancel" />
          <Button onPress={confirmIosDate} label="Confirm" />
        </View>
      )} */}
    </View>
  );
};

export default DatePicker;
