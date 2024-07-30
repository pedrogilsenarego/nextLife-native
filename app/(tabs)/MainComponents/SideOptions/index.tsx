import ColorPicker from "@/app/login/MainCard/ColorPicker";
import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import IconTheme from "@/components/Molecules/IconTheme";
import SwitchTheme from "@/components/Molecules/SwitchTheme";
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/providers/ThemeContext";
import { useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { AntDesign } from "@expo/vector-icons";

export const SideOptions = () => {
  const logout = async () => {
    await supabase.auth.signOut();
  };
  const [openSettings, setOPenSettings] = useState(false);
  const { theme } = useTheme();

  return (
    <View
      style={{
        display: "flex",
        rowGap: 15,
        justifyContent: "flex-end",

        height: "100%",
        paddingBottom: 60,
      }}
    >
      <Pressable>
        <BlurView intensity={100} style={styles.blurContainer}>
          <AntDesign color={"whitesmoke"} size={20} name="user" />
          <Text style={styles.text}>User</Text>
        </BlurView>
      </Pressable>

      <Pressable onPress={() => setOPenSettings(true)}>
        <BlurView intensity={100} style={styles.blurContainer}>
          <AntDesign color={"whitesmoke"} size={20} name="setting" />
          <Text style={styles.text}>Settings</Text>
        </BlurView>
      </Pressable>
      <>
        <Pressable onPress={logout}>
          <BlurView intensity={100} style={styles.blurContainer}>
            <AntDesign color={"whitesmoke"} size={20} name="logout" />
            <Text style={styles.text}>Logout</Text>
          </BlurView>
        </Pressable>
        <BottomPopup
          fullHeight
          openModal={openSettings}
          onClose={() => setOPenSettings(false)}
        >
          <BottomPopupContent>
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
          </BottomPopupContent>
        </BottomPopup>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: "100%",
    textAlign: "center",
    justifyContent: "flex-start",
    display: "flex",
    flexDirection: "row",
    columnGap: 15,
    overflow: "hidden",
    borderRadius: 70,
  },
  text: {
    color: "whitesmoke",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
