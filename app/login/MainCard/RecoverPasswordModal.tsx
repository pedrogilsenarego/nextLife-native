import { BottomPopupContent } from "@/components/BottomPopup";
import ControlledInput from "@/components/inputs/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { View, Text } from "react-native";
import {
  RecoverEmailSchema,
  RecoverEmailType,
} from "./RecoverPasswordModal.validation";
import Button from "@/components/button/ButtonComponent";

export const RecoverPasswordModal: React.FC = () => {
  const defaultValues = { email: "" };
  const methods = useForm<RecoverEmailType>({
    resolver: zodResolver(RecoverEmailSchema),
    defaultValues,
  });

  return (
    <BottomPopupContent>
      <FormProvider {...methods}>
        <View>
          <ControlledInput name="email" />
          <Button
            //isLoading={isPending}
            label="Submit"
            // onPress={methods.handleSubmit(onSubmit)}
          />
        </View>
      </FormProvider>
    </BottomPopupContent>
  );
};
