import { Container } from "@/components/Atoms/Container";
import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import Button from "@/components/button/ButtonComponent";
import ControlledInput from "@/components/inputs/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Dimensions, Pressable, Text, View } from "react-native";
import Select from "@/components/inputs/Select";
import { NewDepositSchema, NewDepositType } from "./validation";
import { addDeposit } from "@/actions/depositActions";
import useDeposits from "@/hooks/useDeposits";
import { defaultDeposits } from "@/constants/defaultDeposits";
import { useTheme } from "@/providers/ThemeContext";
import { AntDesign } from "@expo/vector-icons";

export const AddDeposit: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { mainColor } = useTheme();
  const width = Dimensions.get("screen").width;
  const deposits = useDeposits();
  const firstDeposit = !!((deposits?.data?.length || 0) < 1);
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
      methods.reset();
    },
    onSettled: async () => {},
  });

  const onSubmit: SubmitHandler<NewDepositType> = (data) => {
    const newData = {
      ...data,
      amount: Number(data.amount.replace(",", ".")),
    };
    addDepositMutation(newData);
  };
  return (
    <>
      {firstDeposit ? (
        <Pressable
          onPress={() => setOpenModal(true)}
          style={{ display: "flex", flexDirection: "row", padding: 10 }}
        >
          <Container
            containerStyles={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Add New Deposit +
            </Text>
          </Container>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => setOpenModal(true)}
          style={{ display: "flex", flexDirection: "row", paddingVertical: 6 }}
        >
          <Container
            containerStyles={{
              height: 100,
              width: 200,
              borderColor: `${mainColor}`,
              borderWidth: 3,
              borderRadius: 8,
              padding: 15,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              backgroundColor: "transparent",
              shadowColor: "transparent",
            }}
          >
            <AntDesign name="plus" color={mainColor} size={46} />
          </Container>
        </Pressable>
      )}
      <BottomPopup
        fullHeight
        openModal={openModal}
        onClose={() => setOpenModal(false)}
      >
        <BottomPopupContent>
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
        </BottomPopupContent>
      </BottomPopup>
    </>
  );
};
