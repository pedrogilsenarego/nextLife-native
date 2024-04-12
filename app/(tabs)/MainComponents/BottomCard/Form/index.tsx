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
      style={{ alignItems: "center", width: "100%", paddingHorizontal: 20 }}
    >
      <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 10 }}>
        New
      </Text>

      <View style={{ width: "100%", marginTop: 10 }}>
        <FormProvider {...methods}>
          <View style={{ width: "100%" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",

                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "70%",
                  paddingRight: 5,
                }}
              >
                <ControlledInput variant="edit" label="Note" name="note" />
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
                <Select
                  right
                  name="category"
                  listOptions={defaultCategories}
                  label={"Category"}
                />
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <DatePicker name="created_at" value={new Date()} label="Date" />
            </View>
          </View>
          <View style={{ marginTop: 40 }}>
            <Button
              isLoading={isPending}
              label="Submit"
              onPress={methods.handleSubmit(onSubmit)}
            />
          </View>
        </FormProvider>
      </View>
    </View>
  );
};

export default Form;
