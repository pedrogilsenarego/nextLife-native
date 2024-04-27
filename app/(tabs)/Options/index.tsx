import { Card } from "@/components/Atoms/Card";
import { Container } from "@/components/Atoms/Container";
import { supabase } from "@/lib/supabase";
import { BlurView } from "expo-blur";
import { View, Text, Pressable } from "react-native";

const Options = () => {
  const logout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        rowGap: 30,
      }}
    >
      <BlurView
        intensity={50}
        style={{
          padding: 20,
          margin: 16,

          justifyContent: "center",
          overflow: "hidden",
          borderRadius: 20,
        }}
      >
        <Pressable onPress={logout}>
          <Text
            style={{ color: "whitesmoke", fontSize: 20, fontWeight: "600" }}
          >
            Logout
          </Text>
        </Pressable>
      </BlurView>
      <View style={{ height: 100, width: "100%", paddingHorizontal: 4 }}>
        <Container>
          <Text>Teste</Text>
        </Container>
      </View>
    </View>
  );
};

export default Options;
