import { Container } from "@/components/Atoms/Container";
import { SharedValue } from "react-native-reanimated";
import { LeftComponent } from "./LeftComponent";
import { RightComponent } from "./RightComponent";
import { View, Text } from "react-native";
import { Divider } from "@/components/Atoms/Divider";

type Props = {
  expensesPerDay: { value: number; label: string }[];
  incomesPerDay: { value: number; label: string }[];
  selectedStatus: "expenses" | "incomes" | "both";
  setSelectedStatus: (selectedStatus: "expenses" | "incomes" | "both") => void;
  setAmountToShow: (value: number) => void;
};

const Subcard = ({
  expensesPerDay,
  incomesPerDay,
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
            setAmountToShow={setAmountToShow}
          />
        </View>
        <Divider />
        <LeftComponent
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          expensesPerDay={expensesPerDay}
          incomesPerDay={incomesPerDay}
        />
      </Container>
    </>
  );
};

export default Subcard;
