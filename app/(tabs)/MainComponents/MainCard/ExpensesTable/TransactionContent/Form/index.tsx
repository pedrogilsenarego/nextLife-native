import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { View, Text, Pressable } from "react-native";
import ControlledInput from "@/components/inputs/TextField";
import Select from "@/components/inputs/Select";
import DatePicker from "@/components/inputs/DateTimePicker";
import Button from "@/components/button/ButtonComponent";
import { useMutation } from "@tanstack/react-query";
import { addExpense, updateExpense } from "@/actions/expensesActions";
import useExpenses from "@/hooks/useExpenses";
import { ArrayButtons } from "@/components/Molecules/ArrayButtons";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { useEffect, useState } from "react";
import { addIncome } from "@/actions/incomesActions";
import useIncomes from "@/hooks/useIncomes";
import { PressableTextOption } from "@/components/Atoms/PressableTextOption";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";

import { useApp } from "@/providers/AppProvider";

import { Divider } from "@/components/Atoms/Divider";
import { useForme } from "./useForme";
import {
  defaultCategories,
  defaultIncomesCategories,
} from "@/app/(tabs)/MainComponents/BottomCard/constants";
import { NewEntrySchema, NewEntryType } from "./validation";
import useBusinesses from "@/hooks/useBusinesses";
import { useSelectedTransactions } from "../../TransactionContext";
import { Income } from "@/types/incomesTypes";
import { NoteDrawer } from "@/app/(tabs)/MainComponents/BottomCard/Form/NoteDrawer";
import { DateDrawer } from "@/app/(tabs)/MainComponents/BottomCard/Form/DateDrawer";
import { DepositDrawer } from "@/app/(tabs)/MainComponents/BottomCard/Form/DepositDrawer";

type Props = {
  transaction: Income | undefined;
};

const Form = ({ transaction }: Props) => {
  const { selectedMode, setSelectedTransactionId } = useSelectedTransactions();
  const business = useBusinesses();
  const listBusiness = business?.data?.map((business) => {
    const list = {
      label: business.businessName,
      value: business.id,
    };
    return list;
  });

  const expenses = useExpenses();
  const incomes = useIncomes();
  const { theme } = useTheme();

  const {
    openNoteModal,
    setOpenNoteModal,
    openDateModal,
    setOpenDateModal,
    openDepositModal,
    setOpenDepositModal,
    depositList,
  } = useForme();

  const defaultValues = {
    amount: transaction?.amount.toString() || undefined,
    note: transaction?.note || undefined,
    created_at: transaction?.created_at
      ? new Date(transaction.created_at)
      : undefined,
    category: transaction?.category,
    businessId: transaction?.businessId,
    deposit_id: transaction?.deposit_id,
  };
  const methods = useForm<NewEntryType>({
    resolver: zodResolver(NewEntrySchema),
    defaultValues,
  });

  const { mutate: addExpenseMutation, isPending } = useMutation({
    mutationFn: selectedMode === "expense" ? updateExpense : updateExpense,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      selectedMode === "expense" ? expenses.refetch() : incomes.refetch();
      setSelectedTransactionId(null);
    },
    onSettled: async () => {},
  });

  const isEqual = (a: any, b: any) => {
    if (typeof a === "object" && typeof b === "object") {
      return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
  };

  const onSubmit: SubmitHandler<NewEntryType> = (data) => {
    const newData = {
      ...data,
      amount: Number(data.amount.replace(",", ".")),
    };

    const updatedFields: Partial<any> = {};

    (Object.keys(newData) as (keyof NewEntryType)[]).forEach((key) => {
      if (key === "amount") {
        // Compare the formatted amount with the original value
        if (newData[key] !== Number(defaultValues[key])) {
          updatedFields[key] = newData[key] as any;
        }
      } else {
        if (!isEqual(newData[key], defaultValues[key])) {
          updatedFields[key] = newData[key] as any;
        }
      }
    });

    if (transaction) {
      console.log(updatedFields);
      addExpenseMutation({
        expenseId: transaction.id,
        updatedFields,
      });
    }
  };

  const deposit_id = methods.watch("deposit_id");

  return (
    <View style={{ width: "100%", marginTop: 50 }}>
      <FormProvider {...methods}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",

            borderRadius: 4,

            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: "50%",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <ControlledInput
              variant="big"
              keyboardType="decimal-pad"
              name="amount"
              placeholder="0.0"
              units="€"
            />
          </View>
        </View>
        <View style={{ marginTop: -8 }}>
          <Divider />
        </View>
        <View
          style={{
            flexDirection: "row",
            position: "relative",
            justifyContent: "space-between",
            paddingVertical: 40,
          }}
        >
          <View style={{ position: "absolute", right: 8, top: 8 }}>
            <FontAwesome
              name="question-circle"
              size={23}
              color={theme === "dark" ? "#ffffff66" : "black"}
            />
          </View>
          <View style={{ width: "49%" }}>
            <Select
              left
              height={160}
              style={{ borderTopRightRadius: 6 }}
              name="businessId"
              listOptions={listBusiness || []}
            />
          </View>
          <View style={{ width: "49%" }}>
            {selectedMode === "expense" ? (
              <Select
                height={160}
                right
                name="category"
                listOptions={defaultCategories}
              />
            ) : (
              <Select
                right
                height={160}
                name="category"
                listOptions={defaultIncomesCategories}
              />
            )}
          </View>
        </View>
        <View style={{ marginTop: -25 }}>
          <Divider />
        </View>
        <View
          style={{ rowGap: 13, paddingHorizontal: 10, paddingVertical: 16 }}
        >
          <PressableTextOption
            onPress={() => setOpenDepositModal(true)}
            label="Choose Deposit"
            helperText={
              depositList?.find(
                (option) => option.value === methods.watch("deposit_id")
              )?.label || "Associate the transaction to a deposit"
            }
            icon={
              <View style={{ padding: 2 }}>
                <FontAwesome5
                  name="coins"
                  size={20}
                  color={deposit_id === undefined ? Colors.steelGray : "green"}
                />
              </View>
            }
          />
          <PressableTextOption
            onPress={() => setOpenDateModal(true)}
            label="Change Date"
            helperText={`${methods.watch("created_at").toLocaleDateString()}`}
            icon={
              <Entypo
                name="calendar"
                size={24}
                color={
                  methods.watch("note") === undefined
                    ? Colors.steelGray
                    : "green"
                }
              />
            }
          />
          <PressableTextOption
            validated={methods.watch("note") !== undefined}
            onPress={() => setOpenNoteModal(true)}
            label="Add Note"
            helperText="Create a note for this entry"
            icon={
              <AntDesign
                name="edit"
                size={24}
                color={
                  methods.watch("note") === undefined
                    ? Colors.steelGray
                    : "green"
                }
              />
            }
          />
        </View>

        <Divider />
        <View style={{ marginTop: 20 }}>
          <Button
            isLoading={isPending}
            label="Update"
            onPress={methods.handleSubmit(onSubmit)}
          />
        </View>
        <NoteDrawer openModal={openNoteModal} setOpenModal={setOpenNoteModal} />
        <DateDrawer openModal={openDateModal} setOpenModal={setOpenDateModal} />
        <DepositDrawer
          name={"deposit_id"}
          depositList={[
            { value: undefined, label: "None" },
            ...(depositList || []),
          ]}
          openModal={openDepositModal}
          setOpenModal={setOpenDepositModal}
        />
      </FormProvider>
    </View>
  );
};

export default Form;
