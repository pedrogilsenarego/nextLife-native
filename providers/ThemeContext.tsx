import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Colors = keyof typeof Colors;

interface ThemeContexType {
  mainColor: Colors;
  changeMainColor: (color: Colors) => void;
}

const ThemeContext = createContext<ThemeContexType | undefined>(undefined);

const Colors = {
  orangeRed: "#FF4500",
  black: "black",
  fuchsia: "#ca2c92",
  tealc: "#009ca6",
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mainColor, setMainColor] = useState<Colors>(
    Colors.orangeRed as Colors
  );

  useEffect(() => {
    async function loadPersistedMainColor() {
      try {
        const persistedMainColor = await AsyncStorage.getItem("mainColor");

        if (
          persistedMainColor &&
          Object.values(Colors).includes(persistedMainColor)
        ) {
          setMainColor(persistedMainColor as Colors);
        }
      } catch (error) {
        console.error("Error loading persisted main color:", error);
      }
    }

    loadPersistedMainColor();
  }, []);

  const changeMainColor = async (color: Colors) => {
    if (Object.keys(Colors).includes(color)) {
      setMainColor(Colors[color] as Colors);
      try {
        await AsyncStorage.setItem("mainColor", Colors[color] as Colors);
      } catch (error) {
        console.error("Error saving main color to AsyncStorage:", error);
      }
    } else {
      console.log("Invalid color provided", color);
    }
  };

  return (
    <ThemeContext.Provider value={{ mainColor, changeMainColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
