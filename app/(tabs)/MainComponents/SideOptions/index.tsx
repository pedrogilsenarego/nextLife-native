import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Pressable, View, Text, StyleSheet, FlatList } from "react-native";
import { BlurView } from "expo-blur";
import { AntDesign } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { SettingsContent } from "./SettingsContent";
import { ProfileContent } from "./ProfileContent";
import React from "react";

type Props = {
  open: boolean;
};

export const SideOptions = (props: Props) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openSettings, setOPenSettings] = useState(false);

  const buttonData: any = [
    {
      name: "user",
      label: "User",
      onPress: () => {
        setOpenProfile(true);
      },
    },
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
    <>
      <View style={styles.container}>
        {props.open && (
          <FlatList
            data={buttonData}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
      <SettingsContent
        openSettings={openSettings}
        setOpenSettings={setOPenSettings}
      />
      <ProfileContent
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
      />
    </>
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

  settingsSubtitle: {
    fontSize: 16,
    marginTop: 14,
  },
});

export default SideOptions;
