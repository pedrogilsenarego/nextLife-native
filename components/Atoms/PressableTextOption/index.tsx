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
        flexDirection: "row",
        columnGap: 10,
        alignItems: "center",
      }}
      {...props}
    >
      {icon && icon}
      <View>
        <Text
          style={{
            fontSize: 16,
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
              marginTop: 2,
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
