import { Container } from "@/components/Atoms/Container";

import useDeposits from "@/hooks/useDeposits";
import { Colors } from "@/providers/ThemeContext";
import { Deposit } from "@/types/depositTypes";
import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import { AddDeposit } from "../AddDeposit";

export const DepositsScroller: React.FC = () => {
  const deposits = useDeposits();
  const firstDeposit = !!((deposits?.data?.length || 0) < 1);
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
            {deposit.amount.toFixed(0)}€
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
        {firstDeposit ? (
          <View
            style={{
              justifyContent: "center",
              borderWidth: 1,
              borderRadius: 6,
              overflow: "visible",
              borderColor: Colors.lightGray,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "gray",
                paddingTop: 10,
                paddingHorizontal: 6,

                lineHeight: 20,
              }}
            >
              This are typicaly used for{" "}
              <Text style={{ fontWeight: 800 }}>Bank</Text> or{" "}
              <Text style={{ fontWeight: 800 }}>Cash</Text>, and can be related
              to the <Text style={{ fontWeight: 800 }}>Businesses</Text>,{" "}
              <Text style={{ fontWeight: 800 }}>Expenses</Text> or{" "}
              <Text style={{ fontWeight: 800 }}>Incomes</Text>.
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "gray",
                paddingTop: 10,
                paddingHorizontal: 6,
                paddingBottom: 20,

                lineHeight: 20,
              }}
            >
              They help track the money available.
            </Text>
            <AddDeposit />
          </View>
        ) : (
          <ScrollView
            horizontal
            contentContainerStyle={{
              flexDirection: "row",
              columnGap: 4,
            }}
            scrollEnabled
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
          >
            {deposits?.data.map((deposit) => (
              <DepositItem deposit={deposit} key={deposit.id} />
            ))}
            <AddDeposit />
          </ScrollView>
        )}
      </View>
    </View>
  );
};
