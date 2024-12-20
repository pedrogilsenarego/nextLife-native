import { useMutation } from "@tanstack/react-query";
import { useSelectedDeposit } from "../DepositsContext";
import { deleteDeposit } from "@/actions/depositActions";
import useDeposits from "@/hooks/useDeposits";

export const useDepositContent = () => {
  const { selectedDeposit, setSelectedDeposit } = useSelectedDeposit();
  const deposits = useDeposits();

  const { mutate: deleteDepositMutation, isPending } = useMutation({
    mutationFn: deleteDeposit,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      setSelectedDeposit(null);
      deposits.refetch();
    },
    onSettled: async () => {},
  });
  const handleDeleteDeposit = () => {
    if (!selectedDeposit) return;
    deleteDepositMutation(selectedDeposit);
  };
  return { handleDeleteDeposit, isPending };
};
