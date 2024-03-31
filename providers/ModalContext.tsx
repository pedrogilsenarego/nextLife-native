import React, { createContext, useState, useContext, ReactNode } from "react";
import Dialog from "@/components/Dialog";

interface DialogContent {
  title: string;
  message: string;
}

interface ModalContextType {
  createDialog: (content: DialogContent) => void;
}

const defaultDialogContent: DialogContent = { title: "", message: "" };

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogContent, setDialogContent] =
    useState<DialogContent>(defaultDialogContent);

  const createDialog = (content: DialogContent) => {
    setDialogContent(content);
    setDialogVisible(true);
  };

  return (
    <ModalContext.Provider value={{ createDialog }}>
      {children}
      <Dialog
        title={dialogContent.title}
        message={dialogContent.message}
        isVisible={dialogVisible}
        setIsVisible={setDialogVisible}
      />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
