import React, { createContext, useContext, useState, ReactNode } from "react";

type SelectedTransactionContextProps = {
  selectedTransactionId: string | null;
  selectedMode: "expense" | "income";
  setSelectedTransactionId: (transactionId: string | null) => void;
  setSelectedMode: (selectedMode: "expense" | "income") => void;
};

const SelectedTransactionContext =
  createContext<SelectedTransactionContextProps>({
    selectedTransactionId: null,
    setSelectedTransactionId: () => {},
    selectedMode: "expense",
    setSelectedMode: () => {},
  });

export const SelectedTransactionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);
  const [selectedMode, setSelectedMode] = useState<"expense" | "income">(
    "expense"
  );

  return (
    <SelectedTransactionContext.Provider
      value={{
        selectedTransactionId,
        setSelectedTransactionId,
        selectedMode,
        setSelectedMode,
      }}
    >
      {children}
    </SelectedTransactionContext.Provider>
  );
};

export const useSelectedTransactions = () => {
  return useContext(SelectedTransactionContext);
};
