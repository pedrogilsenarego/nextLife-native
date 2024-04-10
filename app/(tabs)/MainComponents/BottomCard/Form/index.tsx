import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { NewEntrySchema, NewEntryType } from "../validation";
import { defaultCategories } from "../constants";
import { View, Text } from "react-native";
import ControlledInput from "@/components/inputs/TextField";
import Select from "@/components/inputs/Select";
import DatePicker from "@/components/inputs/DateTimePicker";
import Button from "@/components/button/ButtonComponent";
import { useMutation } from "@tanstack/react-query";
import { addExpense } from "@/actions/expensesActions";
import useExpenses from "@/hooks/useExpenses";

type Props = {
  listBusiness: { value: string; label: string }[];
};

const Form = ({ listBusiness }: Props) => {
  const expenses = useExpenses();
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
    mutationFn: addExpense,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      methods.reset();
      expenses.refetch();
    },
    onSettled: async () => {},
  });

  const onSubmit: SubmitHandler<NewEntryType> = (data) => {
    const newData = {
      ...data,

      amount: Number(data.amount.replace(",", ".")),
    };

    console.log(newData);
    addExpenseMutation(newData);
  };

  return (
    <View
      style={{ alignItems: "center", width: "100%", paddingHorizontal: 12 }}
    >
      <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 10 }}>
        New
      </Text>
      <View style={{ marginTop: 30, width: "100%" }}>
        <FormProvider {...methods}>
          <View style={{ width: "100%" }}>
            <ControlledInput
              variant="big"
              keyboardType="decimal-pad"
              name="amount"
              placeholder="0.0"
              units="€"
            />
            <Select name="businessId" listOptions={listBusiness} />
            <Select name="category" listOptions={defaultCategories} />
            <DatePicker name="created_at" value={new Date()} />
            <ControlledInput label="Note" name="note" placeholder="Note" />
          </View>
          <Button
            isLoading={isPending}
            label="Submit"
            onPress={methods.handleSubmit(onSubmit)}
          />
        </FormProvider>
      </View>
    </View>
  );
};

export default Form;