import useMetrics from "@/hooks/useMetrics";
import useUser from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Colors, useTheme } from "@/providers/ThemeContext";
import ChartInitial from "./ChartInitial";
import React, { useState } from "react";
import ExpensesTable from "./ExpensesTable";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import PieChartMain from "./PieChartMain/PieChartMain";

const MainCard = () => {
  const [selectedDate, setSelectedDate] = useState<string>("Total");
  const logout = async () => {
    await supabase.auth.signOut();
  };
  const currentDate = new Date();
  const monthInLetters = currentDate.toLocaleString("default", {
    month: "long",
  });
  const formattedDate = `${currentDate.getDate()}, ${monthInLetters} ${currentDate.getFullYear()}`;

  const userQuery = useUser();
  const { contrastColor, mainColor, theme } = useTheme();
  const [selectedStatus, setSelectedStatus] = useState<
    "expenses" | "incomes" | "both"
  >("expenses");
  const { totalExpenses, totalIncomes } = useMetrics();

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: theme === "light" ? "white" : "transparent",
        borderRadius: 12,

        marginHorizontal: 4,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },

        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingVertical: 18,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 10,
          borderRadius: 8,
          position: "relative",
          height: "100%",
        }}
      >
        <Pressable>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text
                style={{
                  color: theme === "light" ? Colors.black : "white",
                  fontSize: 20,
                }}
              >
                Hello,{" "}
                <Text
                  style={{ fontWeight: "bold", textTransform: "capitalize" }}
                >
                  {userQuery?.data?.username}
                </Text>
              </Text>
              <Text
                style={{
                  color: theme === "light" ? Colors.lightGray : "whitesmoke",
                }}
              >
                Your monthly balance
              </Text>
              <Text
                style={{
                  color: theme === "light" ? Colors.black : "white",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {(totalIncomes() - totalExpenses()).toFixed(1)} Є
              </Text>
            </View>
            <View
              style={{
                justifyContent: "flex-end",
                paddingBottom: 5,
                rowGap: 6,
              }}
            >
              <Text
                style={{
                  color: theme === "light" ? Colors.black : "whitesmoke",
                }}
              >
                {formattedDate}
              </Text>
              <View
                style={{
                  backgroundColor: theme === "light" ? "white" : "#ffffff1A",
                  borderWidth: theme === "light" ? 2 : undefined,
                  borderRadius: 24,
                  flexDirection: "row",
                  padding: theme === "light" ? 2 : 4,

                  columnGap: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor:
                      theme === "light" ? Colors.black : mainColor,
                    borderRadius: 20,
                    padding: 10,
                  }}
                >
                  <AntDesign
                    name="dotchart"
                    color={theme === "light" ? "white" : contrastColor}
                    size={18}
                  />
                </View>
                <View
                  style={{
                    borderRadius: 14,
                    padding: 10,
                  }}
                >
                  <AntDesign
                    name="piechart"
                    color={theme === "light" ? Colors.black : contrastColor}
                    style={{ opacity: 0.7 }}
                    size={18}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* <View>
          <PieChartMain />
        </View> */}
          <View>
            <ChartInitial
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
          </View>

          <View>
            <ExpensesTable
              selectedDate={selectedDate}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
          </View>
          <Pressable
            onPress={logout}
            style={{ marginTop: 30, marginBottom: 200 }}
          >
            <Text style={{ color: "whitesmoke" }}>Logout</Text>
          </Pressable>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default MainCard;
