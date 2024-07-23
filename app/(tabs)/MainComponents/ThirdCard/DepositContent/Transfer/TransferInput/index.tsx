import BottomPopup from "@/components/BottomPopup";
import Select from "@/components/inputs/Select";
import useDeposits from "@/hooks/useDeposits";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { View, Text, Pressable } from "react-native";
import { useSelectedDeposit } from "../../../DepositsContext";
import { AntDesign } from "@expo/vector-icons";

export const TransferInput: React.FC = () => {
  const { mainColor } = useTheme();
  const deposits = useDeposits();
  const [openInputModal, setOpenInputModal] = useState<boolean>(false);
  const { selectedDeposit } = useSelectedDeposit();
  const { watch } = useFormContext();

  const targetDeposit = watch("transferToId");
  const selectedAmount = watch("amount") || 0; // Ensure selectedAmount is a number
  if (!deposits?.data) return;
  const filteredDeposits = deposits?.data.filter(
    (deposit) => deposit.id !== selectedDeposit
  );
  const selectedDepositAmount =
    deposits?.data?.find((deposit) => deposit.id === selectedDeposit)?.amount ||
    0;
  const targetDepositAmount =
    deposits?.data?.find((deposit) => deposit.id === targetDeposit)?.amount ||
    0;

  const remainingAmount = selectedDepositAmount - Number(selectedAmount);
  const transferedAmount = targetDepositAmount + Number(selectedAmount);
  const listDepositsInput = filteredDeposits?.map((deposit) => ({
    label: deposit.depositName,
    value: deposit.id,
  }));

  const Input = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Select
          onChange={() => setOpenInputModal(false)}
          height={160}
          style={{ borderTopRightRadius: 6 }}
          name="transferToId"
          listOptions={listDepositsInput}
        />
      </View>
    );
  };
  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => setOpenInputModal(true)}
          style={{
            flex: 1,
            position: "relative",
            marginRight: 10,
          }}
        >
          <View
            style={{
              backgroundColor: mainColor,
              padding: 20,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color:
                  selectedAmount && selectedAmount !== "0"
                    ? Colors.red
                    : Colors.white,
                fontWeight: "700",
                fontSize: 20,
              }}
            >
              {remainingAmount.toFixed(1)}
            </Text>
          </View>

          <Text
            style={{
              color: "gray",
              position: "absolute",
              width: "100%",
              bottom: -20,
              textAlign: "center",
            }}
          >
            {deposits?.data?.find((deposit) => deposit.id === selectedDeposit)
              ?.depositName || ""}
          </Text>
        </Pressable>
        <AntDesign name="arrowright" size={30} />
        <Pressable
          onPress={() => setOpenInputModal(true)}
          style={{
            flex: 1,
            position: "relative",
            marginLeft: 10,
          }}
        >
          <View
            style={{
              backgroundColor: mainColor,
              padding: 20,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color:
                  selectedAmount && selectedAmount !== "0"
                    ? "green"
                    : Colors.white,
                fontWeight: "700",
                fontSize: 20,
              }}
            >
              {transferedAmount.toFixed(1)}
            </Text>
          </View>

          <Text
            style={{
              color: "gray",
              position: "absolute",
              width: "100%",
              bottom: -20,
              textAlign: "center",
            }}
          >
            {deposits?.data?.find((deposit) => deposit.id === targetDeposit)
              ?.depositName || ""}
          </Text>
        </Pressable>
      </View>
      <BottomPopup
        openModal={openInputModal}
        fullHeight
        closeIcon
        onClose={() => setOpenInputModal(false)}
      >
        {" "}
        <Input />
      </BottomPopup>
    </>
  );
};
