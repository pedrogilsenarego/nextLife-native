import { Colors, useTheme } from "@/providers/ThemeContext";
import { Pressable, PressableProps, Text, View } from "react-native";

type Props = PressableProps & {
  label: string;
  helperText?: string | number;
  icon?: React.ReactNode;
  validated?: boolean;
};

export const PressableTextOption: React.FC<Props> = ({
  label,
  helperText,
  icon,
  validated,
  ...props
}) => {
  const { theme } = useTheme();
  return (
    <Pressable
      style={{
        display: "flex",
        backgroundColor: `${Colors.white}66`,
        flexDirection: "row",
        padding: 10,
        borderRadius: 4,
        columnGap: 10,
        alignItems: "center",
        width: "100%",
      }}
      {...props}
    >
      {icon && icon}
      <View>
        <Text
          style={{
            fontSize: 14,
            color: validated
              ? "green"
              : theme === "dark"
              ? Colors.white
              : Colors.black,
            fontWeight: "bold",
          }}
        >
          {label}
        </Text>
        {helperText && (
          <Text
            style={{
              marginTop: 0,
              fontSize: 12,
              color: validated ? "green" : Colors.steelGray,
            }}
          >
            {helperText}
          </Text>
        )}
      </View>
    </Pressable>
  );
};
