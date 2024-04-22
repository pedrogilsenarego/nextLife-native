import { supabase } from "@/lib/supabase";
import { View, Text, Pressable } from "react-native";

const Options = () => {
  const logout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable onPress={logout} style={{ marginTop: 30, marginBottom: 200 }}>
        <Text style={{ color: "whitesmoke", fontSize: 20, fontWeight: "600" }}>
          Logout
        </Text>
      </Pressable>
    </View>
  );
};

export default Options;
