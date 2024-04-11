import { Picker, PickerProps } from "@react-native-picker/picker";

import {
  UseControllerProps,
  useController,
  useFormContext,
} from "react-hook-form";

import { Pressable, Text } from "react-native";

interface PickerPropsI extends PickerProps, UseControllerProps {
  label?: string;
  defaultValue?: string;
  listOptions: { label: string; value: string }[];
  left?: boolean;
  right?: boolean;
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
        <Text style={{ fontSize: 18, fontWeight: "600", marginLeft: 13 }}>
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
          marginTop: 5,
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: "#0000000D",
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
