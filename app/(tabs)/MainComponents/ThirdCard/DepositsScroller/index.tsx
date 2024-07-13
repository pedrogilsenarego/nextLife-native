import { Container } from "@/components/Atoms/Container";
import { Divider } from "@/components/Atoms/Divider";
import useDeposits from "@/hooks/useDeposits";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { Deposit } from "@/types/depositTypes";
import { View, Text, ScrollView, Pressable } from "react-native";
import { AddDeposit } from "../AddDeposit";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export const DepositsScroller: React.FC = () => {
  const deposits = useDeposits();
  const { theme, mainColor } = useTheme();

  const DepositItem = ({ deposit }: { deposit: Deposit }) => {
    return (
      <Pressable style={{ paddingVertical: 6 }}>
        <Container
          containerStyles={{
            width: 120,
            height: 120,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",

            borderWidth: 2,
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
