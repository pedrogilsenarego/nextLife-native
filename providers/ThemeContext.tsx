import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ColorsProp = keyof typeof Colors;

interface ThemeContexType {
  mainColor: ColorsProp;
  theme: "light" | "dark";
  changeMainColor: (color: ColorsProp) => void;
  changeTheme: (theme: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContexType | undefined>(undefined);

export const Colors = {
  orangeRed: "#FF4500",
  black: "black",
  fuchsia: "#ca2c92",
  tealc: "#009ca6",
  purple: "#800080",
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mainColor, setMainColor] = useState<ColorsProp>(
    Colors.orangeRed as ColorsProp
  );
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    async function loadPersistedMainColor() {
      try {
        const persistedMainColor = await AsyncStorage.getItem("mainColor");

        if (
          persistedMainColor &&
          Object.values(Colors).includes(persistedMainColor)
        ) {
          setMainColor(persistedMainColor as ColorsProp);
        }
      } catch (error) {
        console.error("Error loading persisted main color:", error);
      }
    }
    async function loadPersistedTheme() {
      try {
        const persistedTheme = await AsyncStorage.getItem("theme");

        if (
          persistedTheme &&
          (persistedTheme === "dark" || persistedTheme === "light")
        ) {
          setTheme(persistedTheme as "dark" | "light");
        }
      } catch (error) {
        console.error("Error loading persisted theme:", error);
      }
    }

    loadPersistedMainColor();
    loadPersistedTheme();
  }, []);

  const changeMainColor = async (color: ColorsProp) => {
    if (Object.keys(Colors).includes(color)) {
      setMainColor(Colors[color] as ColorsProp);
      try {
        await AsyncStorage.setItem("mainColor", Colors[color] as ColorsProp);
      } catch (error) {
        console.error("Error saving main color to AsyncStorage:", error);
      }
    } else {
      console.log("Invalid color provided", color);
    }
  };

  const changeTheme = async (mode: "light" | "dark") => {
    if (mode === "light" || mode === "dark") {
      setTheme(mode);
      try {
        await AsyncStorage.setItem("theme", mode);
      } catch (error) {
        console.error("Error saving theme to AsyncStorage:", error);
      }
    } else {
      console.log("Invalid theme provided", mode);
    }
  };

  return (
    <ThemeContext.Provider
      value={{ mainColor, changeMainColor, theme, changeTheme }}
    >
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
