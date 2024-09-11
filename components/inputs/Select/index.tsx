import { useTheme } from "@/providers/ThemeContext";
import { Picker, PickerProps } from "@react-native-picker/picker";

import {
  UseControllerProps,
  useController,
  useFormContext,
} from "react-hook-form";

import { Pressable, Text, View } from "react-native";

interface PickerPropsI extends PickerProps, UseControllerProps {
  label?: string;
  defaultValue?: string;
  listOptions: { label: string; value: string | number | undefined }[];
  left?: boolean;
  right?: boolean;
  height?: number;
  onChange?: () => void;
}

const Select = (props: PickerPropsI) => {
  const formContext = useFormContext();
  const { theme } = useTheme();
  const { formState } = formContext;
  const { name, label, rules, defaultValue, ...inputProps } = props;
  const { field } = useController({ name, rules, defaultValue });
  const error = formState.errors[name];

  const handleValueChange = (itemValue: string | number) => {
    const originalOption = props.listOptions.find(
      (option) => option.value == itemValue
    );
    if (originalOption) {
      field.onChange(originalOption.value);
    } else {
      field.onChange(itemValue);
    }
    if (props.onChange) props.onChange();
  };

  return (
    <View style={{ height: (props?.height || 150) + 30 }}>
      {label && (
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            textAlign: "center",
            color: theme === "dark" ? "white" : "black",
          }}
        >
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
          height: props.height || 120,
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: "transparent",
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
          onValueChange={(itemValue, itemIndex) => handleValueChange(itemValue)}
        >
          {props.listOptions.map((item, index) => {
            return (
              <Picker.Item
                key={index}
                color={theme === "dark" ? "white" : "black"}
                label={item.label}
                value={item.value}
              />
            );
          })}
        </Picker>
      </Pressable>
    </View>
  );
};

export default Select;
