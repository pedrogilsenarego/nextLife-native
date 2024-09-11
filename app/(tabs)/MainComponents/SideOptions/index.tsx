import ColorPicker from "@/app/login/MainCard/ColorPicker";
import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import IconTheme from "@/components/Molecules/IconTheme";
import SwitchTheme from "@/components/Molecules/SwitchTheme";
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/providers/ThemeContext";
import { useState } from "react";
import { Pressable, View, Text, StyleSheet, FlatList } from "react-native";
import { BlurView } from "expo-blur";
import { AntDesign } from "@expo/vector-icons";

import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

type Props = {
  open: boolean;
};

export const SideOptions = (props: Props) => {
  const [openSettings, setOPenSettings] = useState(false);
  const { theme } = useTheme();

  const buttonData: any = [
    { name: "user", label: "User", onPress: () => {} },
    {
      name: "setting",
      label: "Settings",
      onPress: () => setOPenSettings(true),
    },
    {
      name: "logout",
      label: "Logout",
      onPress: async () => await supabase.auth.signOut(),
    },
  ];

  const renderItem = ({ item, index }: any) => (
    <Animated.View
      entering={FadeInDown.delay(index * 150)}
      exiting={FadeOutDown}
    >
      <Pressable onPress={item.onPress}>
        <BlurView intensity={100} style={styles.blurContainer}>
          <AntDesign color={"whitesmoke"} size={20} name={item.name} />
          <Text style={styles.text}>{item.label}</Text>
        </BlurView>
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {props.open && (
        <FlatList
          data={buttonData}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.listContent}
        />
      )}
      <BottomPopup
        fullHeight
        openModal={openSettings}
        onClose={() => setOPenSettings(false)}
      >
        <BottomPopupContent>
          <View style={styles.settingsContainer}>
            <View style={styles.settingsContent}>
              <Text
                style={[
                  styles.settingsText,
                  { color: theme === "light" ? "black" : "white" },
                ]}
              >
                Choose a style
              </Text>
              <Text
                style={[
                  styles.settingsSubtitle,
                  { color: theme === "light" ? "black" : "white" },
                ]}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    height: "100%",
    paddingBottom: 60,
  },
  listContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
    rowGap: 15,
  },
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
  settingsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginVertical: 20,
    rowGap: 50,
    flex: 1,
  },
  settingsContent: {
    alignItems: "center",
    flexDirection: "column",
  },
  settingsText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  settingsSubtitle: {
    fontSize: 16,
    marginTop: 14,
  },
});

export default SideOptions;
