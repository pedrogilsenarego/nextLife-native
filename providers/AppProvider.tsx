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
  selectedDate: string;
  changeSelectedDate: (selectedDate: string) => void;
  bottomCardOpen: boolean;
  setBottomCardOpen: (bottomCardOpen: boolean) => void;
  updateBusinessFilter: (id: string) => void;
  businessFilter: string[];
  updateCategoryFilterExpenses: (id: string) => void;
  categoryFilterExpenses: string[];
  updateCategoryFilterIncomes: (id: string) => void;
  categoryFilterIncomes: string[];
}

const AppContext = createContext<AppContexType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [dateRange, setDateRange] = useState<DateRangeValues>("currentMonth");
  const [selectedDate, setSelectedDate] = useState<string>("Total");
  const [businessFilter, setBusinessFilter] = useState<string[]>([]);
  const [categoryFilterExpenses, setCategoryFilterExpenses] = useState<
    string[]
  >([]);
  const [categoryFilterIncomes, setCategoryFilterIncomes] = useState<string[]>(
    []
  );
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

  const changeSelectedDate = (value: string) => {
    setSelectedDate(value);
  };

  const updateBusinessFilter = (id: string) => {
    setBusinessFilter((prevBusinessFilter) => {
      if (!prevBusinessFilter?.includes(id)) {
        return [...prevBusinessFilter, id];
      } else {
        return prevBusinessFilter.filter((item) => item !== id);
      }
    });
  };

  const updateCategoryFilterExpenses = (id: string) => {
    setCategoryFilterExpenses((prevCategoryFilter) => {
      if (!prevCategoryFilter?.includes(id)) {
        return [...prevCategoryFilter, id];
      } else {
        return prevCategoryFilter.filter((item) => item !== id);
      }
    });
  };

  const updateCategoryFilterIncomes = (id: string) => {
    setCategoryFilterIncomes((prevCategoryFilter) => {
      if (!prevCategoryFilter?.includes(id)) {
        return [...prevCategoryFilter, id];
      } else {
        return prevCategoryFilter.filter((item) => item !== id);
      }
    });
  };

  return (
    <AppContext.Provider
      value={{
        selectedDate,
        changeSelectedDate,
        dateRange,
        changeDateRange,
        updateBusinessFilter,
        bottomCardOpen,
        setBottomCardOpen,
        businessFilter,
        updateCategoryFilterExpenses,
        categoryFilterExpenses,
        updateCategoryFilterIncomes,
        categoryFilterIncomes,
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
