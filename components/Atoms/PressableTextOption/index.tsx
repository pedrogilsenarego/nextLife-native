import { Colors, useTheme } from "@/providers/ThemeContext";
import { Pressable, PressableProps, Text, View } from "react-native";

type Props = PressableProps & {
  label: string;
  helperText?: string;
  icon?: React.ReactNode;
};

export const PressableTextOption: React.FC<Props> = ({
  label,
  helperText,
  icon,
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
            color: theme === "dark" ? Colors.white : Colors.black,
            fontWeight: "bold",
          }}
        >
          {label}
        </Text>
        {helperText && (
          <Text
            style={{
              fontSize: 12,
              color: Colors.lightGray,
            }}
          >
            {helperText}
          </Text>
        )}
      </View>
    </Pressable>
  );
};
