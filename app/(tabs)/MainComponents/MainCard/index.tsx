import useMetrics from "@/hooks/useMetrics";
import useUser from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useTheme } from "@/providers/ThemeContext";
import ChartInitial from "./Chart";
import React from "react";
import ExpensesTable from "./ExpensesTable";

const MainCard = () => {
  const logout = async () => {
    await supabase.auth.signOut();
  };

  const userQuery = useUser();

  const { totalExpenses, totalIncomes } = useMetrics();

  return (
    <ScrollView
      style={{
        paddingVertical: 22,
        paddingHorizontal: 18,

        height: "100%",
      }}
    >
      <Pressable>
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
        <View>
          <ChartInitial />
        </View>
        <View style={{ marginTop: 20 }}>
          <ExpensesTable />
        </View>
        <Pressable
          onPress={logout}
          style={{ marginTop: 30, marginBottom: 200 }}
        >
          <Text style={{ color: "whitesmoke" }}>Logout</Text>
        </Pressable>
      </Pressable>
    </ScrollView>
  );
};

export default MainCard;
