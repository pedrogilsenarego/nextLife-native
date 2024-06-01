import BottomPopup from "@/components/BottomPopup";
import IconTheme from "@/components/Molecules/IconTheme";
import SwitchTheme from "@/components/Molecules/SwitchTheme";
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/providers/ThemeContext";
import { useState } from "react";
import { Pressable, View, Text } from "react-native";

export const SideOptions = () => {
  const logout = async () => {
    await supabase.auth.signOut();
  };
  const [openSettings, setOPenSettings] = useState(false);
  const { theme } = useTheme();
  return (
    <View>
      <View
        style={{
          padding: 20,

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable>
          <Text
            style={{
              color: "whitesmoke",
              fontSize: 24,
              fontWeight: "600",
            }}
          >
            User
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          padding: 20,

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable onPress={() => setOPenSettings(true)}>
          <Text
            style={{
              color: "whitesmoke",
              fontSize: 24,
              fontWeight: "600",
            }}
          >
            Settings
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          padding: 20,

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable onPress={logout}>
          <Text
            style={{
              color: "whitesmoke",
              fontSize: 24,
              fontWeight: "600",
            }}
          >
            Logout
          </Text>
        </Pressable>
        <BottomPopup
          fullHeight
          closeIcon
          openModal={openSettings}
          onClose={() => setOPenSettings(false)}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginVertical: 20,
              rowGap: 50,
              flex: 1,
            }}
          >
            <View
              style={{
                alignItems: "center",

                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: theme === "light" ? "black" : "white",
                }}
              >
                Choose a style
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 14,
                  color: theme === "light" ? "black" : "white",
                }}
              >
                Customize your interface
              </Text>
              <SwitchTheme />
            </View>
            <IconTheme />
          </View>
        </BottomPopup>
      </View>
    </View>
  );
};
