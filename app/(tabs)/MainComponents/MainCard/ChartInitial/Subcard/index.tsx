import { ArrayButtons } from "@/components/Buttons/ArrayButtons";
import AnimatedText from "@/components/Charts/LineChart/AnimatedText";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useFont } from "@shopify/react-native-skia";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SharedValue } from "react-native-reanimated";

type Props = {
  selectedDate: string;
  expensesPerDay: { value: number; label: string }[];
  incomesPerDay: { value: number; label: string }[];
  accValue: SharedValue<number>;
  accValue2: SharedValue<number>;
  selectedValue: SharedValue<number>;
  selectedValue2: SharedValue<number>;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  selectedStatus: "expenses" | "incomes" | "both";
  setSelectedStatus: (selectedStatus: "expenses" | "incomes" | "both") => void;
};

const Subcard = ({
  selectedDate,
  expensesPerDay,
  incomesPerDay,
  accValue,
  accValue2,
  selectedValue,
  selectedValue2,
  selectedStatus,
  setSelectedDate,
  setSelectedStatus,
}: Props) => {
  const currentDate = new Date();
  const { theme } = useTheme();
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long" });
  const totalExpenses = expensesPerDay
    .reduce((acc, value) => acc + value.value, 0)
    .toFixed(0);

  const totalIncomes = incomesPerDay
    .reduce((acc, value) => acc + value.value, 0)
    .toFixed(0);

  const font = useFont(
    require("../../../../../../assets/fonts/OpenSans-Regular.ttf"),
    14
  );

  if (!font || !expensesPerDay.length) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#ffffff",
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: Colors.lightGray,
        justifyContent: "space-between",
        columnGap: 5,
        alignItems: "flex-start",
        marginTop: 10,

        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <View>
        <>
          <View
            style={{
              flexDirection: "row",

              columnGap: 5,

              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: theme === "light" ? Colors.black : "whitesmoke",
              }}
            >
              {selectedDate === "Total" ? "Day:" : `Day(${selectedDate}):`}
            </Text>
            {selectedDate !== "Total" ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 2,
                }}
              >
                <Text
                  style={{
                    color:
                      selectedStatus !== "both"
                        ? theme === "light"
                          ? Colors.black
                          : "whitesmoke"
                        : "#82ca9d",
                  }}
                >
                  {selectedValue.value.toFixed(0)}€
                </Text>

                {selectedStatus === "both" && (
                  <>
                    <Text
                      style={{
                        color: theme === "light" ? Colors.black : "whitesmoke",
                      }}
                    >
                      /
                    </Text>
                    <Text style={{ color: "#c80815" }}>
                      {selectedValue2.value.toFixed(0)}€
                    </Text>
                  </>
                )}
              </View>
            ) : (
              <Text
                style={{
                  color: theme === "light" ? Colors.black : "whitesmoke",
                }}
              >
                {" "}
                -
              </Text>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",

              columnGap: 5,
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: theme === "light" ? Colors.black : "whitesmoke" }}
            >
              Acc:
            </Text>
            {selectedDate !== "Total" ? (
              <>
                <Text
                  style={{
                    color:
                      selectedStatus !== "both"
                        ? theme === "light"
                          ? Colors.black
                          : "whitesmoke"
                        : "#82ca9d",
                  }}
                >
                  {accValue.value.toFixed(0)}€
                </Text>
                {selectedStatus === "both" && (
                  <>
                    <Text
                      style={{
                        color: theme === "light" ? Colors.black : "whitesmoke",
                      }}
                    >
                      /
                    </Text>
                    <Text style={{ color: "#c80815" }}>
                      {accValue2.value.toFixed(0)}€
                    </Text>
                  </>
                )}
              </>
            ) : (
              <Text
                style={{
                  color: theme === "light" ? Colors.black : "whitesmoke",
                }}
              >
                {" "}
                -
              </Text>
            )}
          </View>
        </>

        {selectedStatus === "expenses" && (
          <Text
            style={{
              color: theme === "light" ? Colors.black : "whitesmoke",
              fontWeight: "600",
              marginTop: 8,
            }}
          >
            {monthName}: {totalExpenses}€
          </Text>
        )}
        {selectedStatus === "incomes" && (
          <Text
            style={{
              color: theme === "light" ? Colors.black : "whitesmoke",
              fontWeight: "600",
              marginTop: 8,
            }}
          >
            {monthName}: {totalIncomes}€
          </Text>
        )}
        {selectedStatus === "both" && (
          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <Text
              style={{
                color: theme === "light" ? Colors.black : "whitesmoke",
                fontWeight: "600",
              }}
            >
              {monthName}:{" "}
            </Text>
            <Text style={{ color: "#82ca9d", fontWeight: "600" }}>
              {totalIncomes}€
            </Text>
            <Text
              style={{
                color: theme === "light" ? Colors.black : "whitesmoke",
              }}
            >
              {" "}
              /{" "}
            </Text>
            <Text style={{ color: "#c80815", fontWeight: "600" }}>
              {totalExpenses}€
            </Text>
          </View>
        )}
      </View>
      <View>
        <ArrayButtons
          buttons={["expenses", "incomes", "both"]}
          onSelected={(selected) => {
            setSelectedStatus(selected);
            setSelectedDate("Total");
            accValue.value = 0;
            selectedValue.value = 0;
          }}
        />
      </View>
    </View>
  );
};

export default Subcard;
