import { Container } from "@/components/Atoms/Container";

import useDeposits from "@/hooks/useDeposits";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { Deposit } from "@/types/depositTypes";
import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import { AddDeposit } from "../AddDeposit";
import { BlurView } from "expo-blur";
import { useSelectedDeposit } from "../DepositsContext";
import BottomPopup from "@/components/BottomPopup";

export const DepositsScroller: React.FC = () => {
  const { selectedDeposit, setSelectedDeposit } = useSelectedDeposit();
  const deposits = useDeposits();
  const { mainColor } = useTheme();
  const firstDeposit = !!((deposits?.data?.length || 0) < 1);
  const width = Dimensions.get("screen").width;

  const DepositItem = ({ deposit }: { deposit: Deposit }) => {
    return (
      <Pressable
        style={{ paddingTop: 6, paddingBottom: 30 }}
        onPress={() => setSelectedDeposit(deposit.id)}
      >
        <BlurView
          intensity={10}
          style={{ width: width / 4 - 24, height: width / 4 - 24 }}
        >
          <View
            style={{
              height: "100%",
              display: "flex",
              backgroundColor: `${mainColor}0D`,

              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            <Text
              style={{
                color: mainColor,
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              {deposit.amount.toFixed(0)}
            </Text>
          </View>
          <Text
            style={{
              height: "60%",
              textAlign: "center",
              color: "gray",
              fontSize: 12,
            }}
          >
            {deposit.depositName}
          </Text>
        </BlurView>
      </Pressable>
    );
  };

  if (!deposits.data) return null;

  return (
    <>
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
              columnGap: 20,
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
      <BottomPopup
        openModal={!!selectedDeposit}
        onClose={() => setSelectedDeposit(null)}
      >
        <View style={{ height: 200 }}>
          <Text>teste</Text>
        </View>
      </BottomPopup>
    </>
  );
};
