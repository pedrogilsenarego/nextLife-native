import useMetrics from "@/hooks/useMetrics";
import useUser from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useTheme } from "@/providers/ThemeContext";
import ChartInitial from "./Chart";
import React from "react";
import ExpensesTable from "./ExpensesTable";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import PieChartMain from "./PieChartMain/PieChartMain";

const MainCard = () => {
  const logout = async () => {
    await supabase.auth.signOut();
  };

  const userQuery = useUser();
  const { contrastColor } = useTheme();

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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={{ color: "white", fontSize: 20 }}>
              Hello,{" "}
              <Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>
                {userQuery?.data?.username}
              </Text>
            </Text>
            <Text style={{ color: "whitesmoke" }}>Your monthly balance</Text>
            <Text style={{ color: "white", fontSize: 26, fontWeight: "bold" }}>
              {(totalIncomes() - totalExpenses()).toFixed(1)} Є
            </Text>
          </View>
          <View style={{ justifyContent: "flex-end", paddingBottom: 5 }}>
            <View
              style={{
                backgroundColor: "#ffffff1A",

                borderRadius: 24,
                flexDirection: "row",
                padding: 4,

                columnGap: 8,
              }}
            >
              <View
                style={{
                  backgroundColor: "black",
                  borderRadius: 20,
                  padding: 10,
                }}
              >
                <AntDesign name="dotchart" color={contrastColor} size={20} />
              </View>
              <View
                style={{
                  borderRadius: 14,
                  padding: 10,
                }}
              >
                <AntDesign name="piechart" color="whitesmoke" size={20} />
              </View>
            </View>
          </View>
        </View>

        <View>
          <PieChartMain />
        </View>
        {/* <View>
          <ChartInitial />
        </View> */}

        {/* <View style={{ marginTop: 20 }}>
          <ExpensesTable />
        </View> */}
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
