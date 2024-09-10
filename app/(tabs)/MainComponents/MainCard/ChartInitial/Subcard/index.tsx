import { Container } from "@/components/Atoms/Container";
import { SharedValue } from "react-native-reanimated";
import { LeftComponent } from "./LeftComponent";
import { RightComponent } from "./RightComponent";
import { View, Text } from "react-native";
import { Divider } from "@/components/Atoms/Divider";

type Props = {
  expensesPerDay: { value: number; label: string }[];
  incomesPerDay: { value: number; label: string }[];
  accValue: SharedValue<number>;
  accValue2: SharedValue<number>;

  selectedStatus: "expenses" | "incomes" | "both";
  setSelectedStatus: (selectedStatus: "expenses" | "incomes" | "both") => void;
  setAmountToShow: (value: number) => void;
};

const Subcard = ({
  expensesPerDay,
  incomesPerDay,
  accValue,
  accValue2,

  selectedStatus,

  setSelectedStatus,
  setAmountToShow,
}: Props) => {
  if (!expensesPerDay.length) {
    return null;
  }

  return (
    <>
      <Container
        containerStyles={{
          marginVertical: 4,
          flexDirection: "column",
          rowGap: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <RightComponent
            setSelectedStatus={setSelectedStatus}
            accValue={accValue}
            setAmountToShow={setAmountToShow}
          />
        </View>
        <Divider />
        <LeftComponent
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          accValue={accValue}
          accValue2={accValue2}
          expensesPerDay={expensesPerDay}
          incomesPerDay={incomesPerDay}
        />
      </Container>
    </>
  );
};

export default Subcard;
