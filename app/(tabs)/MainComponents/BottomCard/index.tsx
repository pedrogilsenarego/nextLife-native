import useBusinesses from "@/hooks/useBusinesses";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { View, Text } from "react-native";
import { NewEntrySchema, NewEntryType } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultCategories, defaultValues } from "./constants";
import ControlledInput from "@/components/inputs/TextField";
import Button from "@/components/button/ButtonComponent";
import DatePicker from "@/components/inputs/DateTimePicker";
import Select from "@/components/inputs/Select";

const BottomCard = () => {
  const methods = useForm<NewEntryType>({
    resolver: zodResolver(NewEntrySchema),
    defaultValues,
  });
  const onSubmit: SubmitHandler<NewEntryType> = (data) => {
    // Convert commas to periods in the amount field
    const newData = {
      ...data,

      amount: data.amount.replace(",", "."),
    };

    console.log(newData);
  };
  return (
    <View
      style={{ alignItems: "center", width: "100%", paddingHorizontal: 12 }}
    >
      <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 10 }}>
        New
      </Text>
      <View style={{ marginTop: 35, width: "100%" }}>
        <FormProvider {...methods}>
          {/* {business?.data?.map((business, index) => (
            <Text key={index}>{business.businessName}</Text>
          ))} */}
          <View style={{ width: "100%" }}>
            <ControlledInput
              variant="big"
              keyboardType="decimal-pad"
              name="amount"
              placeholder="0.0"
              units="€"
            />
            <Select name="category" listOptions={defaultCategories} />
            <DatePicker name="created_at" value={new Date()} />
            <ControlledInput label="Note" name="note" placeholder="Note" />
          </View>
          <Button
            //isLoading={true}
            label="Submit"
            onPress={methods.handleSubmit(onSubmit)}
          />
        </FormProvider>
      </View>
    </View>
  );
};

export default BottomCard;