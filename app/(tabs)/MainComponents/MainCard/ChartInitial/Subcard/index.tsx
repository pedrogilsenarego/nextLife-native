import { Container } from "@/components/Atoms/Container";
import { SharedValue } from "react-native-reanimated";
import { LeftComponent } from "./LeftComponent";
import { RightComponent } from "./RightComponent";

type Props = {
  selectedDate: string;
  expensesPerDay: { value: number; label: string }[];
  incomesPerDay: { value: number; label: string }[];
  accValue: SharedValue<number>;
  accValue2: SharedValue<number>;

  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  selectedStatus: "expenses" | "incomes" | "both";
  setSelectedStatus: (selectedStatus: "expenses" | "incomes" | "both") => void;
  setAmountToShow: (value: number) => void;
};

const Subcard = ({
  selectedDate,
  expensesPerDay,
  incomesPerDay,
  accValue,
  accValue2,

  selectedStatus,
  setSelectedDate,
  setSelectedStatus,
  setAmountToShow,
}: Props) => {
  if (!expensesPerDay.length) {
    return null;
  }

  return (
    <Container containerStyles={{}}>
      <LeftComponent
        selectedDate={selectedDate}
        selectedStatus={selectedStatus}
        setSelectedDate={setSelectedDate}
        setSelectedStatus={setSelectedStatus}
        accValue={accValue}
        accValue2={accValue2}
        expensesPerDay={expensesPerDay}
        incomesPerDay={incomesPerDay}
      />
      <RightComponent
        setSelectedDate={setSelectedDate}
        setSelectedStatus={setSelectedStatus}
        accValue={accValue}
        setAmountToShow={setAmountToShow}
      />
    </Container>
  );
};

export default Subcard;
