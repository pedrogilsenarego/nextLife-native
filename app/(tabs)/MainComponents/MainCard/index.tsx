import useExpenses from "@/hooks/useExpenses";
import useMetrics from "@/hooks/useMetrics";
import useUser from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { View, Text, Pressable, ScrollView } from "react-native";
import moment from "moment";
import BarChart from "@/components/Charts/BarChart";
import { useTheme } from "@/providers/ThemeContext";
import LineChart from "@/components/Charts/LineChart/LineChart";
import { useState } from "react";
import { useSharedValue } from "react-native-reanimated";

const MainCard = () => {
  const logout = async () => {
    await supabase.auth.signOut();
  };
  const dateFormatter = (date: Date) => {
    return moment(date).format("DD MMM HH:MM");
  };
  const { mainColor } = useTheme();
  const userQuery = useUser();
  const [selectedDate, setSelectedDate] = useState<string>("Total");
  const selectedValue = useSharedValue(0);
  const { totalExpenses, totalIncomes } = useMetrics();
  const expenses = useExpenses();
  return (
    <ScrollView
      style={{
        paddingVertical: 22,
        paddingHorizontal: mainColor === "black" ? 4 : 18,

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
        <View style={{ marginVertical: 20 }}>
          <BarChart />
        </View>
        <LineChart
          selectedValue={selectedValue}
          setSelectedDate={setSelectedDate}
        />
        {expenses?.data &&
          expenses?.data.map((expense, index) => {
            return (
              <View
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: "#ffffff66",
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    textTransform: "capitalize",
                  }}
                >
                  {expense.category}
                </Text>
                <View style={{ alignItems: "flex-end" }}>
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "600" }}
                  >
                    {expense.amount}€
                  </Text>
                  <Text style={{ color: "white", fontSize: 12 }}>
                    {dateFormatter(expense.created_at)}
                  </Text>
                </View>
              </View>
            );
          })}
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
