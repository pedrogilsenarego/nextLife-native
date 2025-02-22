import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SelectedBusinessContextProps = {
  selectedBusiness: string | null;
  setSelectedBusiness: (business: string | null) => void;
  openBusinessModal: boolean;
  setOpenBusinessModal: (signal: boolean) => void;
};

const SelectedBusinessContext = createContext<SelectedBusinessContextProps>({
  selectedBusiness: null,
  setSelectedBusiness: () => {},
  openBusinessModal: false,
  setOpenBusinessModal: () => {},
});

export const SelectedBusinessProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null);
  const [openBusinessModal, setOpenBusinessModal] = useState<boolean>(false);

  useEffect(() => {
    async function loadPersistedBusiness() {
      try {
        const persistedBusiness = await AsyncStorage.getItem(
          "selectedBusiness"
        );
        if (persistedBusiness) {
          setSelectedBusiness(persistedBusiness);
        }
      } catch (error) {
        console.error("Error loading persisted business:", error);
      }
    }

    loadPersistedBusiness();
  }, []);

  useEffect(() => {
    async function saveBusiness() {
      try {
        if (selectedBusiness) {
          await AsyncStorage.setItem("selectedBusiness", selectedBusiness);
        } else {
          await AsyncStorage.removeItem("selectedBusiness");
        }
      } catch (error) {
        console.error("Error saving business to AsyncStorage:", error);
      }
    }

    saveBusiness();
  }, [selectedBusiness]);

  return (
    <SelectedBusinessContext.Provider
      value={{
        selectedBusiness,
        setSelectedBusiness,
        openBusinessModal,
        setOpenBusinessModal,
      }}
    >
      {children}
    </SelectedBusinessContext.Provider>
  );
};

export const useSelectedBusiness = () => {
  return useContext(SelectedBusinessContext);
};
