import useUser from "@/hooks/useUser";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Dimensions, Pressable } from "react-native";
import DateCalendar from "./DateCalendar/DateCalendar";
import { BlurView } from "expo-blur";

type Props = {
  setSideMenu: (sideMenu: boolean) => void;
  setSideLeftMenu: (sideMenu: boolean) => void;
};

const Header = ({ setSideMenu, setSideLeftMenu }: Props) => {
  const userQuery = useUser();
  const width = Dimensions.get("screen").width;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 12,

        marginHorizontal: 0,

        width,
      }}
    >
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {userQuery?.data?.username || ""}
        </Text>
        <DateCalendar />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",

          columnGap: 4,
        }}
      >
        <Pressable onPress={() => setSideLeftMenu(true)}>
          <BlurView
            intensity={50}
            style={{ padding: 8, overflow: "hidden", borderRadius: 6 }}
          >
            <Ionicons size={20} name="menu" color={Colors.white} />
          </BlurView>
        </Pressable>
        <Pressable onPress={() => setSideMenu(true)}>
          <BlurView
            intensity={50}
            style={{ padding: 8, overflow: "hidden", borderRadius: 6 }}
          >
            <Ionicons size={20} name="settings" color={Colors.white} />
          </BlurView>
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
