import React, { createContext, useContext, useState, ReactNode } from "react";

type SelectedDepositContextProps = {
  selectedDeposit: number | null;
  setSelectedDeposit: (deposit: number | null) => void;
};

const SelectedDepositContext = createContext<SelectedDepositContextProps>({
  selectedDeposit: null,
  setSelectedDeposit: () => {},
});

export const SelectedDepositProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedDeposit, setSelectedDeposit] = useState<number | null>(null);

  return (
    <SelectedDepositContext.Provider
      value={{ selectedDeposit, setSelectedDeposit }}
    >
      {children}
    </SelectedDepositContext.Provider>
  );
};

export const useSelectedDeposit = () => {
  return useContext(SelectedDepositContext);
};
