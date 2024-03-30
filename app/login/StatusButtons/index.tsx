import { Pressable, View, Text } from "react-native";
type Props = {
  setMode: (mode: "login" | "signup") => void;
  mode: "login" | "signup";
};
const StatusButtons = ({ setMode, mode }: Props) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        columnGap: 30,
        marginTop: 60,
      }}
    >
      <Pressable onPress={() => setMode("login")}>
        <Text
          style={{
            fontSize: 18,

            fontWeight: "500",
          }}
        >
          LOGIN
        </Text>
        <View
          style={{
            height: 3,
            backgroundColor: mode === "login" ? "orangered" : "white",
            borderRadius: 2,
          }}
        />
      </Pressable>
      <Pressable onPress={() => setMode("signup")}>
        <Text
          style={{
            fontSize: 18,

            fontWeight: "500",
          }}
        >
          SIGNUP
        </Text>
        <View
          style={{
            height: 3,
            backgroundColor: mode === "signup" ? "orangered" : "white",
            borderRadius: 2,
          }}
        />
      </Pressable>
    </View>
  );
};

export default StatusButtons;
