import BottomPopup from "@/components/BottomPopup";
import Button from "@/components/button/ButtonComponent";
import DatePicker from "@/components/inputs/DateTimePicker";
import ControlledInput from "@/components/inputs/TextField";
import { useTheme } from "@/providers/ThemeContext";
import { View, Text, Pressable, Keyboard } from "react-native";

type Props = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};

export const DateDrawer: React.FC<Props> = ({ openModal, setOpenModal }) => {
  const { theme } = useTheme();
  return (
    <BottomPopup
      fullHeight
      closeIcon
      openModal={openModal}
      onClose={() => setOpenModal(false)}
    >
      <Pressable
        onPress={() => Keyboard.dismiss()}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          rowGap: 50,
        }}
      >
        <Text
          style={{
            color: theme === "dark" ? "white" : "black",
            fontSize: 20,

            fontWeight: "bold",
          }}
        >
          Change the Date for this entry
        </Text>
        <DatePicker name="created_at" value={new Date()} label="Date" />
        <View style={{ width: "100%" }}>
          <Button label="Change" onPress={() => setOpenModal(false)} />
        </View>
      </Pressable>
    </BottomPopup>
  );
};