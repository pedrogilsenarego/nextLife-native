import { supabase } from "@/lib/supabase";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Alert, StyleSheet, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema, LoginType } from "./validation";
import { defaultValues } from "./constants";
import ControlledInput from "@/components/inputs/TextField";
import Button from "@/components/button/ButtonComponent";
import { signinUser } from "@/actions/userActions";
import { useMutation } from "@tanstack/react-query";

export default function EmailForm() {
  const methods = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signinUser,
    onError: (error) => {
      Alert.alert(error.message);
    },
  });

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    mutate(data);
  };

  async function signUpWithEmail(data: {
    data: { password: string; email: string };
  }) {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: data.data.email,
      password: data.data.password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
  }

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <ControlledInput name="email" placeholder="E-mail" />
        <ControlledInput
          secureTextEntry
          name="password"
          placeholder="Password"
        />

        <Button
          isLoading={isPending}
          label="Login"
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
