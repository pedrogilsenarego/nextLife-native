import React, { createContext, useContext, useState, ReactNode } from "react";

type SelectedCategoryContextProps = {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
};

const SelectedCategoryContext = createContext<SelectedCategoryContextProps>({
  selectedCategory: null,
  setSelectedCategory: () => {},
});

export const SelectedCategoryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <SelectedCategoryContext.Provider
      value={{ selectedCategory, setSelectedCategory }}
    >
      {children}
    </SelectedCategoryContext.Provider>
  );
};

export const useSelectedCategory = () => {
  return useContext(SelectedCategoryContext);
};
