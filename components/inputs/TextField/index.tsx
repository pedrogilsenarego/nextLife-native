import { Colors, useTheme } from "@/providers/ThemeContext";
import { FontAwesome } from "@expo/vector-icons";
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
  variant?: "default" | "big" | "edit";
  units?: string;
}

const ControlledInput = ({ variant = "default", ...props }: TextInputProps) => {
  const formContext = useFormContext();
  const { theme, mainColor } = useTheme();
  const { formState } = formContext;
  const { name, label, rules, defaultValue, ...inputProps } = props;
  const { field } = useController({ name, rules, defaultValue });
  const error = formState.errors[name];

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
      fontWeight: "bold",
      paddingTop: 11,
      paddingBottom: 11,
      paddingLeft: 20,
      borderRadius: 6,
      width: "100%",
      borderColor: mainColor,
    },
    inputBig: {
      fontWeight: "bold",

      fontSize: 40,

      color: theme === "light" ? Colors.black : "white",
      borderWidth: 0,
      borderColor: "transparent",
    },
    edit: { fontSize: 20, borderWidth: 0, borderColor: "white" },
    error: {
      color: "orangered",
    },
  });

  const inputStyles =
    variant === "default"
      ? styles.input
      : variant === "big"
      ? styles.inputBig
      : styles.edit;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          columnGap: 5,
        }}
      >
        <RNTextInput
          placeholderTextColor={
            variant === "big"
              ? theme === "light"
                ? Colors.black
                : "#ffffffCE"
              : undefined
          }
          editable={!inputProps.disabled}
          keyboardType={inputProps.keyboardType}
          keyboardAppearance="dark"
          style={[inputStyles, { borderWidth: theme === "light" ? 2 : 0 }]}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          {...inputProps}
        />
        {variant === "edit" && (
          <FontAwesome name={"edit"} size={34} color={"black"} />
        )}
        {props.units && (
          <Text
            style={{
              fontSize: 34,
              fontWeight: "600",
              color: theme === "dark" ? "#ffffffCE" : "black",
            }}
          >
            {props.units}
          </Text>
        )}
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
