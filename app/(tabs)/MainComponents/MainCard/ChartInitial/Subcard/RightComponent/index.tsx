import { ArrayButtons } from "@/components/Molecules/ArrayButtons";
import { BusinessFilter } from "@/components/Molecules/BusinessFilter";
import { useApp } from "@/providers/AppProvider";
import { memo, useCallback } from "react";
import { View } from "react-native";
import { SharedValue } from "react-native-reanimated";

type Props = {
  accValue: SharedValue<number>;

  setSelectedStatus: (selectedStatus: "expenses" | "incomes" | "both") => void;
  setAmountToShow: (value: number) => void;
};

export const RightComponent = memo(
  ({
    setSelectedStatus,
    accValue,

    setAmountToShow,
  }: Props) => {
    const { changeSelectedDate } = useApp();
    const handleOnSelected = useCallback((selected: any) => {
      setAmountToShow(10);
      setSelectedStatus(selected);
      changeSelectedDate("Total");
      accValue.value = 0;
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
