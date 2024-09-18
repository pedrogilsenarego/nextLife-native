import ColorPicker from "@/app/login/MainCard/ColorPicker";
import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import IconTheme from "@/components/Molecules/IconTheme";
import SwitchTheme from "@/components/Molecules/SwitchTheme";
import { supabase } from "@/lib/supabase";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { useState } from "react";
import { Pressable, View, Text, StyleSheet, FlatList } from "react-native";
import { BlurView } from "expo-blur";
import { AntDesign } from "@expo/vector-icons";

import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { Container } from "@/components/Atoms/Container";

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
        openModal={openSettings}
        title="Settings"
        onClose={() => setOPenSettings(false)}
      >
        <BottomPopupContent>
          <Container containerStyles={{ flexDirection: "column", rowGap: 10 }}>
            <View
              style={{
                backgroundColor: `${Colors.pearlWhite}66`,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderRadius: 4,
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 10,

                width: "100%",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SwitchTheme />
              </View>
              <IconTheme />
            </View>

            <View
              style={{
                backgroundColor: `${Colors.pearlWhite}66`,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderRadius: 4,
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 10,

                width: "100%",
              }}
            >
              <Text
                style={{
                  fontWeight: 600,
                  color: theme === "light" ? Colors.black : "white",
                }}
              >
                Choose Main Color
              </Text>
              <ColorPicker />
            </View>
          </Container>
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

  settingsSubtitle: {
    fontSize: 16,
    marginTop: 14,
  },
});

export default SideOptions;
