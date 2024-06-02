import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { NewEntrySchema, NewEntryType } from "../validation";
import { defaultCategories, defaultIncomesCategories } from "../constants";
import { View, Text, Pressable } from "react-native";
import ControlledInput from "@/components/inputs/TextField";
import Select from "@/components/inputs/Select";
import DatePicker from "@/components/inputs/DateTimePicker";
import Button from "@/components/button/ButtonComponent";
import { useMutation } from "@tanstack/react-query";
import { addExpense } from "@/actions/expensesActions";
import useExpenses from "@/hooks/useExpenses";
import { ArrayButtons } from "@/components/Molecules/ArrayButtons";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { useEffect, useState } from "react";
import { addIncome } from "@/actions/incomesActions";
import useIncomes from "@/hooks/useIncomes";
import { PressableTextOption } from "@/components/Atoms/PressableTextOption";
import { FontAwesome } from "@expo/vector-icons";
import { NoteDrawer } from "./NoteDrawer";
import { useForme } from "./useForme";
import { useApp } from "@/providers/AppProvider";

type Props = {
  listBusiness: { value: string; label: string }[];
};

const Form = ({ listBusiness }: Props) => {
  const { setBottomCardOpen } = useApp();
  const expenses = useExpenses();
  const incomes = useIncomes();
  const { theme } = useTheme();
  const [mode, setMode] = useState<"expense" | "income">("expense");
  const { openNoteModal, setOpenNoteModal } = useForme();

  const defaultValues = {
    amount: undefined,
    note: undefined,
    created_at: new Date(),
    category: defaultCategories[0].value,
    businessId: listBusiness[0]?.value || "",
  };
  const methods = useForm<NewEntryType>({
    resolver: zodResolver(NewEntrySchema),
    defaultValues,
  });

  const { mutate: addExpenseMutation, isPending } = useMutation({
    mutationFn: mode === "expense" ? addExpense : addIncome,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      methods.reset();
      if (mode === "expense") {
        methods.setValue("category", defaultCategories[0].value);
      } else {
        methods.setValue("category", defaultIncomesCategories[0].value);
      }
      mode === "expense" ? expenses.refetch() : incomes.refetch();
      setBottomCardOpen(false);
    },
    onSettled: async () => {},
  });

  const onSubmit: SubmitHandler<NewEntryType> = (data) => {
    const newData = {
      ...data,
      amount: Number(data.amount.replace(",", ".")),
    };
    addExpenseMutation(newData);
  };

  useEffect(() => {
    if (mode === "expense") {
      methods.setValue("category", defaultCategories[0].value);
    } else {
      methods.setValue("category", defaultIncomesCategories[0].value);
    }
  }, [mode, methods]);

  return (
    <View
      style={{ alignItems: "center", width: "100%", paddingHorizontal: 20 }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 14,
          color: theme === "dark" ? "white" : "black",
        }}
      >
        Add new entry
      </Text>

      <View style={{ width: "100%", marginTop: 6 }}>
        <FormProvider {...methods}>
          <View style={{ width: "100%" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",

                borderRadius: 4,
                padding: 4,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "70%",
                  paddingRight: 5,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ArrayButtons
                  buttons={["expense", "income"]}
                  onSelected={(selected) => setMode(selected)}
                />
              </View>
              <View style={{ width: "30%" }}>
                <ControlledInput
                  variant="big"
                  keyboardType="decimal-pad"
                  name="amount"
                  placeholder="0.0"
                  units="€"
                />
              </View>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "#0000000D",
                width: "100%",
                marginTop: -20,
              }}
            />
            {/* <SelectMine name="businessId" listOptions={defaultCategories} /> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 30,
              }}
            >
              <View style={{ width: "49%" }}>
                <Select
                  left
                  style={{ borderTopRightRadius: 6 }}
                  name="businessId"
                  listOptions={listBusiness}
                  label={"Business"}
                />
              </View>
              <View style={{ width: "49%" }}>
                {mode === "expense" ? (
                  <Select
                    right
                    name="category"
                    listOptions={defaultCategories}
                    label={"Category"}
                  />
                ) : (
                  <Select
                    right
                    name="category"
                    listOptions={defaultIncomesCategories}
                    label={"Category"}
                  />
                )}
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <DatePicker name="created_at" value={new Date()} label="Date" />
            </View>
            <PressableTextOption
              validated={methods.getFieldState("note") !== undefined}
              onPress={() => setOpenNoteModal(true)}
              label="Add note"
              helperText="Create a note for this entry"
              icon={
                <FontAwesome name="edit" size={24} color={Colors.lightGray} />
              }
            />
          </View>
          <View style={{ marginTop: 40 }}>
            <Button
              isLoading={isPending}
              label="Submit"
              onPress={methods.handleSubmit(onSubmit)}
            />
          </View>
          <NoteDrawer
            openModal={openNoteModal}
            setOpenModal={setOpenNoteModal}
          />
        </FormProvider>
      </View>
    </View>
  );
};

export default Form;
