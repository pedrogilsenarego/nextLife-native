import { View, Pressable, ScrollView, Text } from "react-native";

import React, { useState } from "react";

import useBusinesses from "@/hooks/useBusinesses";
import ChartInitial from "../ChartInitial";
import { SelectedTransactionProvider } from "../ExpensesTable/TransactionContext";
import ExpensesTable from "../ExpensesTable";

const Content = () => {
  const [amountToShow, setAmountToShow] = useState<number>(10);
  const businesses = useBusinesses();
  const [selectedStatus, setSelectedStatus] = useState<
    "expenses" | "incomes" | "both"
  >("expenses");

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
    <ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={{
        borderRadius: 8,
        paddingTop: 16,
        position: "relative",
        height: "100%",
      }}
    >
      <Pressable>
        <View>
          <ChartInitial
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            setAmountToShow={setAmountToShow}
          />
        </View>

        <View style={{ marginTop: 6 }}>
          <SelectedTransactionProvider>
            <ExpensesTable
              amountToShow={amountToShow}
              selectedStatus={selectedStatus}
            />
          </SelectedTransactionProvider>
        </View>
      </Pressable>
    </ScrollView>
  );
};

export default Content;
