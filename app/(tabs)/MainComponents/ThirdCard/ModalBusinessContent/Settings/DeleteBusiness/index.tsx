import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { DeleteBusinessSchema, DeleteBusinessType } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteBusiness } from "@/actions/businessActions";
import useBusinesses from "@/hooks/useBusinesses";
import { useSelectedBusiness } from "../../../BusinessContext";
import { useMutation } from "@tanstack/react-query";
import { View, Text } from "react-native";
import { useTheme } from "@/providers/ThemeContext";
import ControlledInput from "@/components/inputs/TextField";
import Button from "@/components/button/ButtonComponent";

type Props = {
  businessId: string;
  businessName: string;
};

export const DeleteBusiness: React.FC<Props> = (props) => {
  const { setSelectedBusiness } = useSelectedBusiness();
  const businesses = useBusinesses();
  const { theme } = useTheme();
  const defaultValues: Partial<DeleteBusinessType> = {
    confirm: undefined,
  };
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
    deleteBusinessMutation(props.businessId);
  };
  return (
    <FormProvider {...methods}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "auto",
          rowGap: 20,
          paddingVertical: 30,
          paddingHorizontal: 20,
        }}
      >
        <View>
          <Text
            style={{
              color: theme === "dark" ? "white" : "black",
              fontSize: 16,
            }}
          >
            Your are deleting{" "}
            <Text style={{ fontWeight: "bold" }}>{props.businessName}</Text>,
            are you sure?
          </Text>
          <Text
            style={{
              color: theme === "dark" ? "white" : "black",
              fontSize: 16,
              marginTop: 10,
            }}
          >
            If yes write <Text style={{ fontWeight: "bold" }}>Confirm</Text> to
            delete the business
          </Text>
        </View>
        <ControlledInput name="confirm" />

        <View style={{ width: "100%" }}>
          <Button
            variant="danger"
            isLoading={isPending}
            label="Delete business"
            onPress={methods.handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </FormProvider>
  );
};
