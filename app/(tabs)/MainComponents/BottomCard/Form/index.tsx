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
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { NoteDrawer } from "./NoteDrawer";
import { useForme } from "./useForme";
import { useApp } from "@/providers/AppProvider";
import { DateDrawer } from "./DateDrawer";
import { Divider } from "@/components/Atoms/Divider";

type Props = {
  listBusiness: { value: string; label: string }[];
};

const Form = ({ listBusiness }: Props) => {
  const { setBottomCardOpen, bottomCardOpen } = useApp();
  const expenses = useExpenses();
  const incomes = useIncomes();
  const { theme } = useTheme();
  const [mode, setMode] = useState<"expense" | "income">("expense");
  const { openNoteModal, setOpenNoteModal, openDateModal, setOpenDateModal } =
    useForme();

  useEffect(() => {
    if (!bottomCardOpen) methods.reset();
  }, [bottomCardOpen]);

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
                height: "100%",
                width: "50%",

                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ArrayButtons
                buttons={["expense", "income"]}
                onSelected={(selected) => setMode(selected)}
              />
            </View>
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
                listOptions={listBusiness}
                //label={"Business"}
              />
            </View>
            <View style={{ width: "49%" }}>
              {mode === "expense" ? (
                <Select
                  height={160}
                  right
                  name="category"
                  listOptions={defaultCategories}
                  //label={"Category"}
                />
              ) : (
                <Select
                  right
                  height={160}
                  name="category"
                  listOptions={defaultIncomesCategories}
                  //label={"Category"}
                />
              )}
            </View>
          </View>
          <View style={{ marginTop: -25 }}>
            <Divider />
          </View>
          <View
            style={{ rowGap: 20, paddingHorizontal: 10, paddingVertical: 25 }}
          >
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
              label="Add note"
              helperText="Create a note for this entry"
              icon={
                <FontAwesome
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
              label="Submit"
              onPress={methods.handleSubmit(onSubmit)}
            />
          </View>
          <NoteDrawer
            openModal={openNoteModal}
            setOpenModal={setOpenNoteModal}
          />
          <DateDrawer
            openModal={openDateModal}
            setOpenModal={setOpenDateModal}
          />
        </FormProvider>
      </View>
    </View>
  );
};

export default Form;
