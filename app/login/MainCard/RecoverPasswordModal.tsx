import { BottomPopupContent } from "@/components/BottomPopup";
import ControlledInput from "@/components/inputs/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { View, Text } from "react-native";
import {
  RecoverEmailSchema,
  RecoverEmailType,
} from "./RecoverPasswordModal.validation";
import Button from "@/components/button/ButtonComponent";
import { useMutation } from "@tanstack/react-query";
import { recoverPassword } from "@/actions/userActions";
import { useModal } from "@/providers/ModalContext";

type Props = {
  setOpenPopup: (openPopup: boolean) => void;
};

export const RecoverPasswordModal: React.FC<Props> = (props) => {
  const defaultValues = { email: "" };
  const { createDialog } = useModal();
  const methods = useForm<RecoverEmailType>({
    resolver: zodResolver(RecoverEmailSchema),
    defaultValues,
  });

  const { isPending, mutate } = useMutation({
    mutationFn: recoverPassword,
    onSuccess: (message) => {
      createDialog({
        title: "Sucess Recover Password",
        message,
        type: "success",
      });
    },
    onError: (error: string) => {
      console.log(error);
      createDialog({
        title: "Error Recover Password",
        message: "Unknown Error",
        type: "error",
      });
    },
    onSettled: () => {
      props.setOpenPopup(false);
    },
  });

  const onSubmit: SubmitHandler<RecoverEmailType> = (data) => {
    console.log(data);
    mutate(data);
  };

  return (
    <BottomPopupContent fullHeight>
      <FormProvider {...methods}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ControlledInput name="email" />
          <Button
            isLoading={isPending}
            label="Submit"
            onPress={methods.handleSubmit(onSubmit)}
          />
        </View>
      </FormProvider>
    </BottomPopupContent>
  );
};
