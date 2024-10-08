import { supabase } from "@/lib/supabase";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Alert, StyleSheet, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema, LoginType } from "./validation";
import { defaultValues } from "./constants";
import ControlledInput from "@/components/inputs/TextField";
import Button from "@/components/button/ButtonComponent";
import { signupUser } from "@/actions/userActions";
import { useMutation } from "@tanstack/react-query";

import { useModal } from "@/providers/ModalContext";

export default function SignupForm() {
  const { createDialog } = useModal();
  const methods = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signupUser,
    onError: (error: string) => {
      createDialog({ title: "Error Signup", message: error, type: "error" });
    },
    onSuccess: (message: string) => {
      createDialog({
        title: "Success Signup",
        message: message,
        type: "success",
      });
    },
  });

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    mutate(data);
  };

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <ControlledInput name="email" placeholder="E-mail" />
        <ControlledInput name="username" placeholder="Username" />
        <ControlledInput
          secureTextEntry
          name="password"
          placeholder="Password"
        />
        <ControlledInput
          secureTextEntry
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <Button
          isLoading={isPending}
          label="Signup"
          onPress={methods.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    padding: 12,
    width: "90%",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  mt20: {
    marginTop: 20,
  },
});
