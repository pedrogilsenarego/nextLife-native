import { View, Pressable, ScrollView, Text } from "react-native";
import ChartInitial from "./ChartInitial";
import React, { useState } from "react";
import ExpensesTable from "./ExpensesTable";
import { Card } from "@/components/Atoms/Card";
import { CardFooter } from "@/components/Molecules/CardFooter";
import useBusinesses from "@/hooks/useBusinesses";

const MainCard = () => {
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
    <Card footer>
      {(businesses.data?.length || 0) < 1 ? (
        <View
          style={{
            paddingHorizontal: 20,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "gray",
              marginTop: 20,

              paddingTop: 10,
              lineHeight: 20,
            }}
          >
            Here the expenses and incomes can be observed using line or bar
            charts. Start by creating a{" "}
            <Text style={{ fontWeight: 800 }}>Business</Text> and add some{" "}
            <Text style={{ fontWeight: 800 }}>Entries</Text>.
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "gray",
              paddingTop: 10,
              paddingBottom: 20,

              lineHeight: 20,
            }}
          >
            Here it is possible to make compositions and filter by{" "}
            <Text style={{ fontWeight: 800 }}>Business</Text> and others, while
            obtaining several metrics are available to help understand the
            charts. It is also possible to select a certain day or month, to
            have a better visualization of the metrics from that specification.
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={{
            marginHorizontal: 10,
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
              <ExpensesTable
                amountToShow={amountToShow}
                selectedStatus={selectedStatus}
              />
            </View>
          </Pressable>
        </ScrollView>
      )}
    </Card>
  );
};

export default MainCard;
