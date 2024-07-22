import { View, Text } from "react-native";
import { useSelectedDeposit } from "../DepositsContext";
import useDeposits from "@/hooks/useDeposits";
import Button from "@/components/button/ButtonComponent";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { defaultDeposits } from "@/constants/defaultDeposits";

export const DepositContent: React.FC = () => {
  const { selectedDeposit } = useSelectedDeposit();
  const { mainColor } = useTheme();
  const deposits = useDeposits();

  const depositData = deposits.data?.find(
    (deposit) => deposit.id === selectedDeposit
  );
  return (
    <View>
      <View style={{ display: "flex", marginTop: 20 }}>
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          {depositData?.depositName}
        </Text>
        <Text style={{ fontSize: 14, color: "gray", textAlign: "center" }}>
          {
            defaultDeposits.find(
              (deposit) => deposit.value === depositData?.depositType
            )?.label
          }
        </Text>
        <Text
          style={{
            marginVertical: 20,
            fontSize: 26,
            color: mainColor,
            textAlign: "center",
            fontWeight: 800,
          }}
        >
          {depositData?.amount}
        </Text>
      </View>
      <Button
        buttonStyle={{ backgroundColor: "white", elevation: 2 }}
        textStyle={{ color: mainColor }}
        label="Update Amount"
      />
      <Button label="Transfer Money" />
    </View>
  );
};

export default DepositContent;
