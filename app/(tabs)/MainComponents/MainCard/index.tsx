import { View, Text } from "react-native";

import React, { useState } from "react";

import { Card } from "@/components/Atoms/Card";

import useBusinesses from "@/hooks/useBusinesses";

import Content from "./Content";

const MainCard = () => {
  const businesses = useBusinesses();

  return (
    <Card footer paperStyles={{ paddingHorizontal: 10 }}>
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
        <Content />
      )}
    </Card>
  );
};

export default MainCard;
