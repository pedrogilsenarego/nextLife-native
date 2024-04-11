import { Picker, PickerProps } from "@react-native-picker/picker";
import { useState } from "react";
import {
  UseControllerProps,
  useController,
  useFormContext,
} from "react-hook-form";
import { Pressable, View, Text } from "react-native";

interface PickerPropsI extends PickerProps, UseControllerProps {
  label?: string;
  defaultValue?: string;
  listOptions: { label: string; value: string }[];
}

const Select = (props: PickerPropsI) => {
  const formContext = useFormContext();

  const { formState } = formContext;
  const { name, label, rules, defaultValue, ...inputProps } = props;
  const { field } = useController({ name, rules, defaultValue });
  const error = formState.errors[name];

  return (
    <>
      {label && (
        <Text style={{ fontSize: 18, fontWeight: "600", marginLeft: 10 }}>
          {label}
        </Text>
      )}
      <Pressable
        onStartShouldSetResponder={() => true}
        onTouchEnd={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        style={{
          height: 120,
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Picker
          itemStyle={{
            fontSize: 18,
            padding: 0,
            margin: 0,
            textTransform: "capitalize",
            marginHorizontal: 0,
            marginVertical: 0,
          }}
          selectedValue={field.value}
          onValueChange={(itemValue, itemIndex) => field.onChange(itemValue)}
        >
          {props.listOptions.map((item, index) => {
            return (
              <Picker.Item key={index} label={item.label} value={item.value} />
            );
          })}
        </Picker>
      </Pressable>
    </>
  );
};

export default Select;
