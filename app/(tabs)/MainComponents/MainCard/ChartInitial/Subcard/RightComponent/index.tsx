import { ArrayButtons } from "@/components/Molecules/ArrayButtons";
import { BusinessFilter } from "@/components/Molecules/BusinessFilter";
import { useApp } from "@/providers/AppProvider";
import { memo, useCallback } from "react";
import { View } from "react-native";

type Props = {
  setSelectedStatus: (selectedStatus: "expenses" | "incomes" | "both") => void;
  setAmountToShow: (value: number) => void;
};

export const RightComponent = memo(
  ({ setSelectedStatus, setAmountToShow }: Props) => {
    const { changeSelectedDate } = useApp();
    const handleOnSelected = useCallback((selected: any) => {
      setAmountToShow(10);
      setSelectedStatus(selected);
      changeSelectedDate("Total");
    }, []);
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <ArrayButtons
          buttons={["expenses", "incomes", "both"]}
          onSelected={handleOnSelected}
        />
        <BusinessFilter />
      </View>
    );
  }
);
