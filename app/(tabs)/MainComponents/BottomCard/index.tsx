import useBusinesses from "@/hooks/useBusinesses";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { View, Text } from "react-native";
import { NewEntrySchema, NewEntryType } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValues } from "./constants";
import ControlledInput from "@/components/inputs/TextField";
import Button from "@/components/button/ButtonComponent";
import DatePicker from "@/components/inputs/DateTimePicker";

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
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 10 }}>
        New
      </Text>
      <View style={{ marginTop: 40 }}>
        <FormProvider {...methods}>
          {/* {business?.data?.map((business, index) => (
            <Text key={index}>{business.businessName}</Text>
          ))} */}
          <ControlledInput
            keyboardType="decimal-pad"
            name="amount"
            placeholder="Value"
          />

          <DatePicker />
          <ControlledInput label="Note" name="note" placeholder="Note" />
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
