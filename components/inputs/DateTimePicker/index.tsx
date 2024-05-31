import { useTheme } from "@/providers/ThemeContext";
import RNDateTimePicker, {
  DateTimePickerEvent,
  DatePickerOptions,
} from "@react-native-community/datetimepicker";

import { useState } from "react";
import {
  UseControllerProps,
  useController,
  useFormContext,
} from "react-hook-form";
import { View, TextInput, Pressable, Platform, Text } from "react-native";

interface DatePickerProps extends DatePickerOptions, UseControllerProps {
  label?: string;
  defaultValue?: string;
}

const DatePicker = (props: DatePickerProps) => {
  const [show, setShow] = useState<boolean>(false);
  const { theme } = useTheme();
  const formContext = useFormContext();

  const { formState } = formContext;

  const { name, label, rules, defaultValue, ...inputProps } = props;

  const { field } = useController({ name, rules, defaultValue });

  const error = formState.errors[name];

  const formatDate = (date: Date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

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
      field.onChange(currentDate);
      setShow(false);
    }
  };

  return (
    <View>
      {label && (
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginLeft: 8,
            color: theme === "dark" ? "white" : "black",
          }}
        >
          {label}
        </Text>
      )}
      {Platform.OS !== "ios" && (
        <Pressable onPress={toggleDatePicker}>
          <TextInput
            value={formatDate(field.value)}
            style={{
              padding: 10,
              backgroundColor: "transparent",
              height: 50,
              fontSize: 14,
              color: theme === "dark" ? "white" : "black",
            }}
            editable={false}
            onPressIn={toggleDatePicker}
          />
        </Pressable>
      )}

      {(show || Platform.OS === "ios") && (
        <RNDateTimePicker
          mode="date"
          display="spinner"
          value={field.value}
          onChange={onChange}
          style={{
            height: 120,
            backgroundColor: "#0000000D",
            marginTop: 5,
          }}
          //maximumDate={}
          //minimumDate={}
        />
      )}
      {error && (
        <View>
          <Text style={{ color: "red" }}>{error?.message?.toString()}</Text>
        </View>
      )}
    </View>
  );
};

export default DatePicker;
