import { Container } from "@/components/Atoms/Container";
import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import Button from "@/components/button/ButtonComponent";
import ControlledInput from "@/components/inputs/TextField";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { NewBusinessSchema, NewBusinessType } from "./validation";
import { addBusiness } from "@/actions/businessActions";
import Select from "@/components/inputs/Select";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import useBusinesses from "@/hooks/useBusinesses";
import { IconSelector } from "./IconSelector";

export const AddBusiness: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const business = useBusinesses();
  const defaultValues = {
    iconType: 0,
    businessName: undefined,
    type: 0,
  };
  const methods = useForm<NewBusinessType>({
    resolver: zodResolver(NewBusinessSchema),
    defaultValues,
  });
  const { mutate: addBusinessMutation, isPending } = useMutation({
    mutationFn: addBusiness,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      setOpenModal(false);
      business.refetch();
    },
    onSettled: async () => {},
  });

  const onSubmit: SubmitHandler<NewBusinessType> = (data) => {
    addBusinessMutation(data);
  };
  return (
    <>
      <Pressable
        onPress={() => setOpenModal(true)}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <Container
          containerStyles={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Add New Business +
          </Text>
        </Container>
      </Pressable>
      <BottomPopup
        fullHeight
        title={"Add Business"}
        openModal={openModal}
        onClose={() => setOpenModal(false)}
      >
        <BottomPopupContent>
          <FormProvider {...methods}>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                rowGap: 20,
              }}
            >
              <IconSelector />

              <ControlledInput name="businessName" placeholder="Name" />
              <View style={{ width: "100%" }}>
                <Select
                  height={160}
                  style={{ borderTopRightRadius: 6 }}
                  name="type"
                  listOptions={defaultBusiness}
                />
              </View>
              <View style={{ width: "100%" }}>
                <Button
                  isLoading={isPending}
                  label="Add Business"
                  onPress={methods.handleSubmit(onSubmit)}
                />
              </View>
            </View>
          </FormProvider>
        </BottomPopupContent>
      </BottomPopup>
    </>
  );
};
