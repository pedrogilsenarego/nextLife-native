import { Container } from "@/components/Atoms/Container";
import BottomPopup from "@/components/BottomPopup";
import Button from "@/components/button/ButtonComponent";
import ControlledInput from "@/components/inputs/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import Select from "@/components/inputs/Select";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import { NewDepositSchema, NewDepositType } from "./validation";
import { addDeposit } from "@/actions/depositActions";
import useDeposits from "@/hooks/useDeposits";
import { defaultDeposits } from "@/constants/defaultDeposits";

export const AddDeposit: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const deposits = useDeposits();
  const defaultValues = {
    depositName: undefined,
    type: 0,
    amount: undefined,
  };
  const methods = useForm<NewDepositType>({
    resolver: zodResolver(NewDepositSchema),
    defaultValues,
  });
  const { mutate: addDepositMutation, isPending } = useMutation({
    mutationFn: addDeposit,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      setOpenModal(false);
      deposits.refetch();
    },
    onSettled: async () => {},
  });

  const onSubmit: SubmitHandler<NewDepositType> = (data) => {
    addDepositMutation(data);
  };
  return (
    <>
      <Pressable
        onPress={() => setOpenModal(true)}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <Container
          containerStyles={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Add New Deposit +
          </Text>
        </Container>
      </Pressable>
      <BottomPopup
        fullHeight
        closeIcon
        openModal={openModal}
        onClose={() => setOpenModal(false)}
      >
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
            <ControlledInput name="depositName" placeholder="Name" />
            <ControlledInput
              variant="big"
              keyboardType="decimal-pad"
              name="amount"
              placeholder="0.0"
              units="€"
            />
            <View style={{ width: "100%" }}>
              <Select
                height={160}
                style={{ borderTopRightRadius: 6 }}
                name="type"
                listOptions={defaultDeposits}
              />
            </View>
            <View style={{ width: "100%" }}>
              <Button
                isLoading={isPending}
                label="Add Deposit"
                onPress={methods.handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </FormProvider>
      </BottomPopup>
    </>
  );
};
