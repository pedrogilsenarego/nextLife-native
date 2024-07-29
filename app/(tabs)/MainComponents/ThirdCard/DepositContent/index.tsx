import { View, Text } from "react-native";
import { useSelectedDeposit } from "../DepositsContext";
import useDeposits from "@/hooks/useDeposits";
import Button from "@/components/button/ButtonComponent";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { defaultDeposits } from "@/constants/defaultDeposits";
import BottomPopup from "@/components/BottomPopup";
import { Transfer } from "./Transfer";
import { useState } from "react";
import { UpdateAmount } from "./UpdateAmount";

export const DepositContent: React.FC = () => {
  const { selectedDeposit } = useSelectedDeposit();
  const [openTransferModal, setOpenTransferModal] = useState<boolean>(false);
  const [openUpdateAmountModal, setOpenUpdateAmountModal] =
    useState<boolean>(false);
  const { mainColor } = useTheme();
  const deposits = useDeposits();

  const depositData = deposits.data?.find(
    (deposit) => deposit.id === selectedDeposit
  );
  return (
    <>
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
              marginVertical: 40,
              fontSize: 26,
              color: mainColor,
              textAlign: "center",
              fontWeight: 800,
            }}
          >
            {depositData?.amount.toFixed(1)}
          </Text>
        </View>
        <Button
          variant="ghost"
          textStyle={{ color: mainColor }}
          label="Update Amount"
          onPress={() => setOpenUpdateAmountModal(true)}
        />
        <Button
          variant="ghost"
          label="Transfer Money"
          onPress={() => setOpenTransferModal(true)}
        />
        <Button variant="danger" label="Delete" />
      </View>
      <BottomPopup
        fullHeight
        openModal={openTransferModal}
        onClose={() => setOpenTransferModal(false)}
      >
        <Transfer />
      </BottomPopup>
      <BottomPopup
        fullHeight
        openModal={openUpdateAmountModal}
        onClose={() => setOpenUpdateAmountModal(false)}
      >
        <UpdateAmount setOpenUpdateAmountModal={setOpenUpdateAmountModal} />
      </BottomPopup>
    </>
  );
};

export default DepositContent;
