import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { View, Text } from "react-native";
import { UpdateSchema, UpdateType } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/button/ButtonComponent";
import { useMutation } from "@tanstack/react-query";
import useDeposits from "@/hooks/useDeposits";
import { useSelectedDeposit } from "../../DepositsContext";
import { updateDepositAmount } from "@/actions/userActions";
import ControlledInput from "@/components/inputs/TextField";

type Props = {
  setOpenUpdateAmountModal: (value: boolean) => void;
};

export const UpdateAmount = ({ setOpenUpdateAmountModal }: Props) => {
  const deposits = useDeposits();

  const { selectedDeposit } = useSelectedDeposit();
  const defaultValues = {
    amount:
      deposits?.data
        ?.find((deposit) => deposit.id === selectedDeposit)
        ?.amount.toFixed(1)
        .toString() || "0",
  };
  const methods = useForm<UpdateType>({
    resolver: zodResolver(UpdateSchema),
    defaultValues,
  });

  const { mutate: updateDepositMutation, isPending } = useMutation({
    mutationFn: updateDepositAmount,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      methods.reset();
      setOpenUpdateAmountModal(false);
      deposits.refetch();
    },
    onSettled: async () => {},
  });

  const onSubmit: SubmitHandler<UpdateType> = (data) => {
    if (!selectedDeposit) return;
    const newData = {
      ...data,
      amount: Number(data.amount.replace(",", ".")),
      depositId: selectedDeposit,
    };
    updateDepositMutation(newData);
  };
  return (
    <View style={{ flex: 1 }}>
      <FormProvider {...methods}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            rowGap: 20,
          }}
        >
          <ControlledInput
            variant="big"
            keyboardType="decimal-pad"
            name="amount"
            placeholder="0.0"
            units="€"
          />
          <View style={{ width: "100%" }}>
            <Button
              isLoading={isPending}
              label="Update Value"
              onPress={methods.handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </FormProvider>
    </View>
  );
};
