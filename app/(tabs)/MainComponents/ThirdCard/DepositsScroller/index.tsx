import { Container } from "@/components/Atoms/Container";

import useDeposits from "@/hooks/useDeposits";
import { Colors } from "@/providers/ThemeContext";
import { Deposit } from "@/types/depositTypes";
import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import { AddDeposit } from "../AddDeposit";

export const DepositsScroller: React.FC = () => {
  const deposits = useDeposits();
  const width = Dimensions.get("screen").width;

  const DepositItem = ({ deposit }: { deposit: Deposit }) => {
    return (
      <Pressable style={{ paddingVertical: 6 }}>
        <Container
          containerStyles={{
            width: width / 3 - 10,
            height: width / 3 - 10,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              height: "40%",
              color: Colors.black,
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            {deposit.amount}€
          </Text>
          <Text
            style={{
              height: "60%",
              textAlign: "center",
              color: "gray",
              fontSize: 16,
            }}
          >
            {deposit.depositName}
          </Text>
        </Container>
      </Pressable>
    );
  };

  if (!deposits.data) return null;

  return (
    <View>
      <View
        style={{
          paddingVertical: 4,
        }}
      >
        <ScrollView
          horizontal
          contentContainerStyle={{
            flexDirection: "row",
            columnGap: 4,
          }}
          scrollEnabled
          nestedScrollEnabled
        >
          {deposits?.data.map((deposit) => (
            <DepositItem deposit={deposit} key={deposit.id} />
          ))}
          <AddDeposit />
        </ScrollView>
      </View>
    </View>
  );
};
