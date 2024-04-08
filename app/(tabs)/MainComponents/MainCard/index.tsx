import useUser from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { View, Text, Pressable } from "react-native";

const MainCard = () => {
  const logout = async () => {
    await supabase.auth.signOut();
  };
  const userQuery = useUser();
  return (
    <View style={{ padding: 22 }}>
      <Text style={{ color: "white", fontSize: 20 }}>
        Hello,{" "}
        <Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>
          {userQuery?.data?.username}
        </Text>
      </Text>
      <Text style={{ color: "whitesmoke" }}>Your monthly balance</Text>
      <Pressable onPress={logout} style={{ marginTop: 30 }}>
        <Text style={{ color: "whitesmoke" }}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default MainCard;
