import { useApp } from "@/providers/AppProvider";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { dateQueriesMap } from "@/utils/dateFormat";
import { formatAmount } from "@/utils/money";
import { View, Text } from "react-native";
import { SharedValue } from "react-native-reanimated";

type Props = {
  expensesPerDay: { value: number; label: string }[];
  incomesPerDay: { value: number; label: string }[];
  accValue: SharedValue<number>;
  accValue2: SharedValue<number>;

  selectedStatus: "expenses" | "incomes" | "both";
  setSelectedStatus: (selectedStatus: "expenses" | "incomes" | "both") => void;
};

export const LeftComponent = ({
  selectedStatus,

  accValue,
  accValue2,
  expensesPerDay,
  incomesPerDay,
}: Props) => {
  const { theme } = useTheme();
  const { dateRange, selectedDate } = useApp();
  const currentDate = dateQueriesMap(dateRange).endDate;

  const monthName = currentDate.toLocaleDateString("en-US", { month: "long" });
  const totalExpenses = expensesPerDay
    .reduce((acc, value) => acc + value.value, 0)
    .toFixed(0);

  const totalIncomes = incomesPerDay
    .reduce((acc, value) => acc + value.value, 0)
    .toFixed(0);

  const selectedExpenseIndex = expensesPerDay?.findIndex(
    (expense) => expense.label === selectedDate
  );

  const firstValue =
    selectedStatus === "expenses"
      ? expensesPerDay?.[selectedExpenseIndex]?.value?.toFixed(0)
      : incomesPerDay?.[selectedExpenseIndex]?.value?.toFixed(0);
  const secondValue = expensesPerDay?.[selectedExpenseIndex]?.value?.toFixed(0);
  return (
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
                {formatAmount(firstValue)}€
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
                    {formatAmount(secondValue)}€
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
          {monthName}: {formatAmount(totalExpenses)}€
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
          {monthName}: {formatAmount(totalIncomes)}€
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
            {formatAmount(totalIncomes)}€
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
            {formatAmount(totalExpenses)}€
          </Text>
        </View>
      )}
    </View>
  );
};
