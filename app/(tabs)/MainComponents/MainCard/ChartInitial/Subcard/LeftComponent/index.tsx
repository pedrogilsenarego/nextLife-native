import { dateRangeLabel } from "@/mappers/dateRange";
import { useApp } from "@/providers/AppProvider";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { dateQueriesMap } from "@/utils/dateFormat";
import { singleMonth } from "@/utils/dateRange";
import { formatAmount } from "@/utils/money";
import { View, Text } from "react-native";
import { SharedValue } from "react-native-reanimated";

type Props = {
  expensesPerDay: { value: number; label: string }[];
  incomesPerDay: { value: number; label: string }[];
  selectedStatus: "expenses" | "incomes" | "both";
  setSelectedStatus: (selectedStatus: "expenses" | "incomes" | "both") => void;
};

export const LeftComponent = ({
  selectedStatus,
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

  const totalDifference = parseInt(totalIncomes) - parseInt(totalExpenses);

  const selectedExpenseIndex = expensesPerDay?.findIndex(
    (expense) => expense.label === selectedDate
  );

  const firstValue =
    selectedStatus === "expenses"
      ? expensesPerDay?.[selectedExpenseIndex]?.value?.toFixed(0)
      : incomesPerDay?.[selectedExpenseIndex]?.value?.toFixed(0);

  const secondValue = expensesPerDay?.[selectedExpenseIndex]?.value?.toFixed(0);

  const firstAccumulatedValue =
    selectedStatus === "expenses"
      ? expensesPerDay
          ?.slice(0, selectedExpenseIndex + 1)
          ?.reduce((acc, curr) => acc + (curr.value || 0), 0)
          ?.toFixed(0)
      : incomesPerDay
          ?.slice(0, selectedExpenseIndex + 1)
          ?.reduce((acc, curr) => acc + (curr.value || 0), 0)
          ?.toFixed(0);

  const secondAccumulatedValue = expensesPerDay
    ?.slice(0, selectedExpenseIndex + 1)
    ?.reduce((acc, curr) => acc + (curr.value || 0), 0)
    ?.toFixed(0);

  const singleMonthValue = singleMonth(dateRange);
  const singleOrMulti = singleMonthValue ? "Day" : "Month";

  const singleValue =
    selectedDate === "Total"
      ? `${singleOrMulti}:`
      : `${singleOrMulti}(${selectedDate}):`;

  return (
    <View>
      {selectedStatus === "expenses" && (
        <Text
          style={{
            color: theme === "light" ? Colors.black : "whitesmoke",
          }}
        >
          {singleMonthValue ? monthName : "Total"}: &#931;{" "}
          {formatAmount(totalExpenses)} ~{" "}
          {formatAmount(
            (parseFloat(totalExpenses) / expensesPerDay.length).toString()
          )}{" "}
          €
        </Text>
      )}
      {selectedStatus === "incomes" && (
        <Text
          style={{
            color: theme === "light" ? Colors.black : "whitesmoke",
          }}
        >
          {singleMonthValue ? monthName : "Total"}: &#931;{" "}
          {formatAmount(totalIncomes)} ~{" "}
          {formatAmount(
            (parseFloat(totalIncomes) / incomesPerDay.length).toString()
          )}{" "}
          €
        </Text>
      )}
      {selectedStatus === "both" && (
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text>{totalDifference > 0 ? "Profit" : "Loss"}: </Text>
            <Text
              style={{
                color: totalDifference > 0 ? "#82ca9d" : "red",
              }}
            >
              &#931; {formatAmount(totalDifference.toFixed(0))} ~{" "}
              {formatAmount(
                (totalDifference / expensesPerDay.length).toString()
              )}{" "}
              €
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>{singleMonthValue ? monthName : "Total"}: </Text>
            <Text style={{ color: "#82ca9d" }}>
              &#931; {formatAmount(totalIncomes)} ~{" "}
              {formatAmount(
                (parseFloat(totalIncomes) / expensesPerDay.length).toString()
              )}{" "}
              €
            </Text>
            <Text
              style={{
                color: theme === "light" ? Colors.black : "whitesmoke",
              }}
            >
              {" "}
              /{" "}
            </Text>
            <Text style={{ color: "#c80815" }}>
              {formatAmount(totalExpenses)} ~{" "}
              {formatAmount(
                (parseFloat(totalExpenses) / incomesPerDay.length).toString()
              )}{" "}
              €
            </Text>
          </View>
        </View>
      )}
      {selectedDate !== "Total" && (
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
              {singleValue}
            </Text>

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
                {formatAmount(firstAccumulatedValue)}€
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
                    {formatAmount(secondAccumulatedValue)}€€
                  </Text>
                </>
              )}
            </>
          </View>
        </>
      )}
    </View>
  );
};
