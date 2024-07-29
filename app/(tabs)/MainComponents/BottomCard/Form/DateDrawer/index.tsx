import BottomPopup from "@/components/BottomPopup";
import Button from "@/components/button/ButtonComponent";
import DatePicker from "@/components/inputs/DateTimePicker";
import ControlledInput from "@/components/inputs/TextField";
import { Colors, useTheme } from "@/providers/ThemeContext";
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
        <View>
          <Text
            style={{
              color: theme === "dark" ? "white" : "black",
              fontSize: 20,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Change the Date for this entry
          </Text>
          <Text
            style={{
              color: Colors.steelGray,
              fontSize: 12,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Dates can be chosen to the future or past
          </Text>
        </View>
        <DatePicker name="created_at" value={new Date()} />
        <View style={{ width: "100%" }}>
          <Button label="Change" onPress={() => setOpenModal(false)} />
        </View>
      </Pressable>
    </BottomPopup>
  );
};
