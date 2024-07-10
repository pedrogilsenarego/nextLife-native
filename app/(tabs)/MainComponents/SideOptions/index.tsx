import ColorPicker from "@/app/login/MainCard/ColorPicker";
import BottomPopup from "@/components/BottomPopup";
import IconTheme from "@/components/Molecules/IconTheme";
import SwitchTheme from "@/components/Molecules/SwitchTheme";
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/providers/ThemeContext";
import { useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

export const SideOptions = () => {
  const logout = async () => {
    await supabase.auth.signOut();
  };
  const [openSettings, setOPenSettings] = useState(false);
  const { theme } = useTheme();

  return (
    <View style={{ display: "flex", rowGap: 10 }}>
      <Pressable>
        <BlurView intensity={100} style={styles.blurContainer}>
          <Text style={styles.text}>User</Text>
        </BlurView>
      </Pressable>

      <Pressable onPress={() => setOPenSettings(true)}>
        <BlurView intensity={100} style={styles.blurContainer}>
          <Text style={styles.text}>Settings</Text>
        </BlurView>
      </Pressable>
      <>
        <Pressable onPress={logout}>
          <BlurView intensity={100} style={styles.blurContainer}>
            <Text style={styles.text}>Logout</Text>
          </BlurView>
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
          <ColorPicker />
        </BottomPopup>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    padding: 10,
    width: "100%",
    textAlign: "center",
    justifyContent: "center",

    overflow: "hidden",
    borderRadius: 70,
  },
  text: {
    color: "whitesmoke",
    fontSize: 24,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
