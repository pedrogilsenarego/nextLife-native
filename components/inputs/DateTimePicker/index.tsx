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
      {Platform.OS !== "ios" && (
        <Pressable onPress={toggleDatePicker}>
          <TextInput
            value={formatDate(field.value)}
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
          value={field.value}
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
      {error && (
        <View>
          <Text style={{ color: "red" }}>{error?.message?.toString()}</Text>
        </View>
      )}
    </View>
  );
};

export default DatePicker;