import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dateRangeList } from "@/utils/dateFormat";

export type DateRangeValues =
  | "1year"
  | "3years"
  | "3Months"
  | "6Months"
  | "currentMonth"
  | "lastMonth"
  | "lastLastMonth";

interface AppContexType {
  dateRange: DateRangeValues;
  changeDateRange: (dateRange: DateRangeValues) => void;
  bottomCardOpen: boolean;
  setBottomCardOpen: (bottomCardOpen: boolean) => void;
}

const AppContext = createContext<AppContexType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [dateRange, setDateRange] = useState<DateRangeValues>("currentMonth");
  const [bottomCardOpen, setBottomCardOpen] = useState<boolean>(false);

  useEffect(() => {
    async function loadPersistedDateRange() {
      try {
        const persistedDateRange = (await AsyncStorage.getItem(
          "dateRange"
        )) as DateRangeValues;

        if (persistedDateRange) {
          setDateRange(persistedDateRange);
        }
      } catch (error) {
        console.error("Error loading persisted dateRange:", error);
      }
    }

    loadPersistedDateRange();
  }, []);

  const changeDateRange = async (dateRange: DateRangeValues) => {
    if (Object.values(dateRangeList).includes(dateRange)) {
      setDateRange(dateRange);
      try {
        await AsyncStorage.setItem("dateRange", dateRange);
      } catch (error) {
        console.error("Error saving dataange to AsyncStorage:", error);
      }
    } else {
      console.log("Invalid dataRange provided", dateRange);
    }
  };

  return (
    <AppContext.Provider
      value={{
        dateRange,
        changeDateRange,
        bottomCardOpen,
        setBottomCardOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
};
