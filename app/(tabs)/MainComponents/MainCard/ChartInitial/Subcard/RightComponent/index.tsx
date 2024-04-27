import { ArrayButtons } from "@/components/Molecules/ArrayButtons";
import { memo, useCallback } from "react";
import { View } from "react-native";
import { SharedValue } from "react-native-reanimated";

type Props = {
  accValue: SharedValue<number>;
  selectedValue: SharedValue<number>;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  setSelectedStatus: (selectedStatus: "expenses" | "incomes" | "both") => void;
  setAmountToShow: (value: number) => void;
};

export const RightComponent = memo(
  ({
    setSelectedDate,
    setSelectedStatus,
    accValue,
    selectedValue,
    setAmountToShow,
  }: Props) => {
    const handleOnSelected = useCallback((selected: any) => {
      setAmountToShow(10);
      setSelectedStatus(selected);
      setSelectedDate("Total");
      accValue.value = 0;
      selectedValue.value = 0;
    }, []);
    return (
      <View>
        <ArrayButtons
          buttons={["expenses", "incomes", "both"]}
          onSelected={handleOnSelected}
        />
      </View>
    );
  }
);
