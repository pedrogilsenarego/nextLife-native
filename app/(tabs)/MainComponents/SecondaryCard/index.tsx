import useMetrics from "@/hooks/useMetrics";
import useUser from "@/hooks/useUser";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Colors, useTheme } from "@/providers/ThemeContext";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import PieChartMain from "../MainCard/PieChartMain/PieChartMain";
import { Container } from "@/components/Atoms/Container";
import { ArrayButtons } from "@/components/Molecules/ArrayButtons";

const SecondaryCard = () => {
  const currentDate = new Date();
  const monthInLetters = currentDate.toLocaleString("default", {
    month: "long",
  });
  const formattedDate = `${currentDate.getDate()}, ${monthInLetters} ${currentDate.getFullYear()}`;

  const userQuery = useUser();
  const { contrastColor, mainColor, theme } = useTheme();

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
          marginHorizontal: 10,
          borderRadius: 8,

          position: "relative",
          height: "100%",
        }}
      >
        <Pressable>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 4,
            }}
          >
            <View style={{ rowGap: 2 }}>
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
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
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
                  backgroundColor:
                    theme === "light" ? Colors.black : "#ffffff1A",
                  width: "auto",
                  borderRadius: 24,
                  flexDirection: "row",
                  display: "flex",
                  padding: 4,

                  columnGap: 8,
                }}
              >
                <View
                  style={{
                    borderRadius: 18,
                    padding: 8,
                  }}
                >
                  <AntDesign
                    name="dotchart"
                    color={theme === "light" ? "#ffffff66" : contrastColor}
                    size={16}
                    style={{ opacity: 0.7 }}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: mainColor,
                    borderRadius: 18,
                    padding: 8,
                  }}
                >
                  <AntDesign
                    name="piechart"
                    color={theme === "light" ? "white" : contrastColor}
                    size={16}
                  />
                </View>
              </View>
            </View>
          </View>

          <View>
            <PieChartMain />
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default SecondaryCard;
