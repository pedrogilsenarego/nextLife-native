import React, { createContext, useState, useContext, ReactNode } from "react";

export type Colors = keyof typeof Colors;

interface ThemeContexType {
  mainColor: Colors;
  changeMainColor: (color: Colors) => void;
}

const ThemeContext = createContext<ThemeContexType | undefined>(undefined);

const Colors = {
  orangeRed: "#FF4500",
  black: "black",
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mainColor, setMainColor] = useState<Colors>(
    Colors.orangeRed as Colors
  );

  const changeMainColor = (color: Colors) => {
    if (Object.keys(Colors).includes(color)) {
      setMainColor(Colors[color] as Colors);
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
