import {
  UseControllerProps,
  useController,
  useFormContext,
} from "react-hook-form";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
  Text,
  StyleSheet,
} from "react-native";

interface TextInputProps extends RNTextInputProps, UseControllerProps {
  label?: string;
  defaultValue?: string;
}

const ControlledInput = (props: TextInputProps) => {
  const formContext = useFormContext();
  const { formState } = formContext;

  const { name, label, rules, defaultValue, ...inputProps } = props;

  const { field } = useController({ name, rules, defaultValue });

  const error = formState.errors[name];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View>
        <RNTextInput
          keyboardAppearance="dark"
          style={styles.input}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          {...inputProps}
        />
      </View>
      {error && (
        <View style={{ paddingLeft: 20, paddingTop: 2 }}>
          <Text style={styles.error}>{error?.message?.toString()}</Text>
        </View>
      )}
    </View>
  );
};

export default ControlledInput;

const styles = StyleSheet.create({
  label: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    justifyContent: "center",
    padding: 8,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "gray",

    fontWeight: "bold",

    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 20,
    borderRadius: 30,
  },
  error: {
    color: "orangered",
  },
});
