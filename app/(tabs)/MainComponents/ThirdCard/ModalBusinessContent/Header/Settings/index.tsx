import BottomPopup from "@/components/BottomPopup";
import { AntDesign } from "@expo/vector-icons";
import { Dispatch, SetStateAction, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Pressable, View, Text } from "react-native";
import { DeleteBusinessSchema, DeleteBusinessType } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { deleteBusiness } from "@/actions/businessActions";
import useBusinesses from "@/hooks/useBusinesses";
import ControlledInput from "@/components/inputs/TextField";
import { useTheme } from "@/providers/ThemeContext";
import Button from "@/components/button/ButtonComponent";
import { useSelectedBusiness } from "../../../BusinessContext";

type Props = {
  businessId: string;
};

export const Settings: React.FC<Props> = ({ businessId }) => {
  const { setSelectedBusiness } = useSelectedBusiness();
  const [openSettingsModal, setOpenSettingsModal] = useState<boolean>(false);
  const { theme } = useTheme();
  const defaultValues: Partial<DeleteBusinessType> = {
    confirm: undefined,
  };
  const businesses = useBusinesses();
  const methods = useForm<DeleteBusinessType>({
    resolver: zodResolver(DeleteBusinessSchema),
    defaultValues,
  });
  const { mutate: deleteBusinessMutation, isPending } = useMutation({
    mutationFn: deleteBusiness,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      setOpenSettingsModal(false);
      businesses.refetch();
      setSelectedBusiness(null);
    },
    onSettled: async () => {},
  });

  const onSubmit: SubmitHandler<DeleteBusinessType> = () => {
    deleteBusinessMutation(businessId);
  };
  return (
    <>
      <Pressable onPress={() => setOpenSettingsModal(true)}>
        <AntDesign name="setting" size={30} />
      </Pressable>
      <BottomPopup
        fullHeight
        closeIcon
        openModal={openSettingsModal}
        onClose={() => setOpenSettingsModal(false)}
      >
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
            <Text
              style={{
                color: theme === "dark" ? "white" : "black",
                fontSize: 20,

                fontWeight: "bold",
              }}
            >
              Write "confirm" to delete the business
            </Text>
            <ControlledInput name="confirm" />

            <View style={{ width: "100%" }}>
              <Button
                isLoading={isPending}
                label="Delete business"
                onPress={methods.handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </FormProvider>
      </BottomPopup>
    </>
  );
};
