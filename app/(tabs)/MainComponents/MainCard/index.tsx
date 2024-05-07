import useMetrics from "@/hooks/useMetrics";
import { View, Pressable, ScrollView } from "react-native";
import ChartInitial from "./ChartInitial";
import React, { useEffect, useState } from "react";
import ExpensesTable from "./ExpensesTable";
import { Card } from "@/components/Atoms/Card";
import { Header } from "../Header";

const MainCard = () => {
  const [selectedDate, setSelectedDate] = useState<string>("Total");

  const [amountToShow, setAmountToShow] = useState<number>(10);
  const [selectedStatus, setSelectedStatus] = useState<
    "expenses" | "incomes" | "both"
  >("expenses");
  const { totalExpenses, totalIncomes } = useMetrics();

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      setAmountToShow((prev) => prev + 10);
    }
  };

  return (
    <Card>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{
          marginHorizontal: 10,
          borderRadius: 8,
          paddingTop: 10,
          position: "relative",
          height: "100%",
        }}
      >
        <Pressable>
          <View>
            <ChartInitial
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              setAmountToShow={setAmountToShow}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <ExpensesTable
              amountToShow={amountToShow}
              selectedDate={selectedDate}
              selectedStatus={selectedStatus}
            />
          </View>
        </Pressable>
      </ScrollView>
    </Card>
  );
};

export default MainCard;
