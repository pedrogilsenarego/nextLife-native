import useDeposits from "@/hooks/useDeposits";
import { useState } from "react";

export const useForme = () => {
  const [openNoteModal, setOpenNoteModal] = useState<boolean>(false);
  const [openDateModal, setOpenDateModal] = useState<boolean>(false);
  const [openDepositModal, setOpenDepositModal] = useState<boolean>(false);
  const deposits = useDeposits();
  const depositList = deposits.data?.map((deposit) => ({
    value: deposit.id,
    label: deposit.depositName,
  }));

  return {
    openNoteModal,
    setOpenNoteModal,
    openDateModal,
    setOpenDateModal,
    openDepositModal,
    setOpenDepositModal,
    depositList,
  };
};
