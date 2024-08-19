import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { View, Text } from "react-native";
import { DeleteBusinessSchema, DeleteBusinessType } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { deleteBusiness } from "@/actions/businessActions";
import useBusinesses from "@/hooks/useBusinesses";
import ControlledInput from "@/components/inputs/TextField";
import { useTheme } from "@/providers/ThemeContext";
import Button from "@/components/button/ButtonComponent";
import { useSelectedBusiness } from "../../BusinessContext";

type Props = {
  businessId: string;
  businessName: string;
};

export const Settings: React.FC<Props> = ({ businessId, businessName }) => {
  const { setSelectedBusiness } = useSelectedBusiness();

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
      businesses.refetch();
      setSelectedBusiness(null);
    },
    onSettled: async () => {},
  });

  const onSubmit: SubmitHandler<DeleteBusinessType> = () => {
    deleteBusinessMutation(businessId);
  };
  return (
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
          Your are deleting {businessName}, are you sure?
        </Text>
        <Text
          style={{
            color: theme === "dark" ? "white" : "black",
            fontSize: 20,

            fontWeight: "bold",
          }}
        >
          If yes write "Confirm" to delete the business
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
  );
};
