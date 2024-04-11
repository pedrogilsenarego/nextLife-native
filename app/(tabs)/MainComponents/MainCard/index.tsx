import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import useMetrics from "@/hooks/useMetrics";
import useUser from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { View, Text, Pressable } from "react-native";

const MainCard = () => {
  const logout = async () => {
    await supabase.auth.signOut();
  };
  const userQuery = useUser();
  const { totalExpenses, totalIncomes } = useMetrics();
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
      <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
        {(totalIncomes() - totalExpenses()).toFixed(1)}
      </Text>
      {expenses?.data &&
        expenses?.data.map((expense) => {
          return <Text>{expense.amount}</Text>;
        })}
      <Pressable onPress={logout} style={{ marginTop: 30 }}>
        <Text style={{ color: "whitesmoke" }}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default MainCard;
