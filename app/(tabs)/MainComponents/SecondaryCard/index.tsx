import { ScrollView, View, Text } from "react-native";

import React from "react";

import PieChartMain from "../MainCard/PieChartMain/PieChartMain";

import { Card } from "@/components/Atoms/Card";
import useBusinesses from "@/hooks/useBusinesses";

const SecondaryCard = () => {
  const businesses = useBusinesses();

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
            Here the expenses and incomes can be observed using a pie chart
            Start by creating a{" "}
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
            Data is mainly separated by{" "}
            <Text style={{ fontWeight: 800 }}>Categories</Text> of expenses and
            incomes. Several metrics are available to help understand the
            charts. It is also possible to select a certain{" "}
            <Text style={{ fontWeight: 800 }}>Category</Text>, to have a better
            visualization of the metrics from that specification.
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            borderRadius: 8,
            paddingTop: 16,
            paddingHorizontal: 10,
            position: "relative",
            height: "100%",
          }}
        >
          <PieChartMain />
        </ScrollView>
      )}
    </Card>
  );
};

export default SecondaryCard;
