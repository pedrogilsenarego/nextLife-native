import useExpenses from "@/hooks/useExpenses";
import useUser from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { View, Text, Pressable } from "react-native";

const MainCard = () => {
  const logout = async () => {
    await supabase.auth.signOut();
  };
  const userQuery = useUser();
  const expenses = useExpenses();
  return (
    <View style={{ padding: 22 }}>
      <Text style={{ color: "white", fontSize: 20 }}>
        Hello,{" "}
        <Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>
          {userQuery?.data?.username}
        </Text>
      </Text>
      <Text style={{ color: "whitesmoke" }}>Your monthly balance</Text>
      {expenses &&
        expenses?.data?.map((expense, index) => (
          <Text key={index} style={{ color: "white", fontSize: 12 }}>
            {expense.category}
            {expense.amount}
          </Text>
        ))}
      <Pressable onPress={logout} style={{ marginTop: 30 }}>
        <Text style={{ color: "whitesmoke" }}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default MainCard;
