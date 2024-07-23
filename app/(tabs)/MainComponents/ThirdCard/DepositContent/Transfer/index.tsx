import { Colors, useTheme } from "@/providers/ThemeContext";
import { View, Text } from "react-native";
import { useSelectedDeposit } from "../../DepositsContext";
import useDeposits from "@/hooks/useDeposits";
import { AntDesign } from "@expo/vector-icons";
import Button from "@/components/button/ButtonComponent";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { TransferSchema, TransferType } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledInput from "@/components/inputs/TextField";
import { TransferInput } from "./TransferInput";

export const Transfer = () => {
  const deposits = useDeposits();
  const { selectedDeposit } = useSelectedDeposit();
  if (!deposits?.data) return;
  const filteredDeposits = deposits?.data.filter(
    (deposit) => deposit.id !== selectedDeposit
  );

  const defaultValues = {
    amount: undefined,
    transferToId: filteredDeposits[0].id,
  };

  const methods = useForm<TransferType>({
    resolver: zodResolver(TransferSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<TransferType> = (data) => {
    const newData = {
      ...data,
      amount: Number(data.amount.replace(",", ".")),
    };
    console.log(newData);
  };

  return (
    <FormProvider {...methods}>
      <View
        style={{
          flex: 1,
          marginTop: 260,
          alignItems: "center",
          justifyContent: "space-between",
          rowGap: 60,
        }}
      >
        <TransferInput />
        <ControlledInput
          variant="big"
          keyboardType="decimal-pad"
          name="amount"
          placeholder="0.0"
          units="€"
        />
        <View style={{ width: "100%" }}>
          <View style={{ width: "100%" }}>
            <Button
              variant="ghost"
              label="Clear"
              onPress={() => methods.resetField("amount")}
            />
          </View>
          <View style={{ width: "100%" }}>
            <Button label="Transfer" onPress={methods.handleSubmit(onSubmit)} />
          </View>
        </View>
      </View>
    </FormProvider>
  );
};
