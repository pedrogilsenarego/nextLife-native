import { Picker, PickerProps } from "@react-native-picker/picker";
import { useState } from "react";
import { Text } from "react-native";
import {
  UseControllerProps,
  useController,
  useFormContext,
} from "react-hook-form";
import { Pressable, View, StyleSheet } from "react-native";

interface PickerPropsI extends PickerProps, UseControllerProps {
  label?: string;
  defaultValue?: string;
  listOptions: { label: string; value: string }[];
}

const SelectMine = (props: PickerPropsI) => {
  const formContext = useFormContext();

  const { formState } = formContext;
  const { name, label, rules, defaultValue, ...inputProps } = props;
  const { field } = useController({ name, rules, defaultValue });
  const error = formState.errors[name];
  const visibleItems = 5;
  const itemHeight = 16;
  const translateY = 0;
  const styles = StyleSheet.create({
    container: {
      height: itemHeight * visibleItems,
      overflow: "hidden",
    },
  });

  return (
    <View style={styles.container}>
      {props.listOptions.map((item, index) => {
        return (
          <Text key={index} style={{ fontSize: 16, lineHeight: 16 }}>
            {item.label}
          </Text>
        );
      })}
    </View>
  );
};

export default SelectMine;
