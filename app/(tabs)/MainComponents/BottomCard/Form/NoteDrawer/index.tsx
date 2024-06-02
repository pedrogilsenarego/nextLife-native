import BottomPopup from "@/components/BottomPopup";
import Button from "@/components/button/ButtonComponent";
import ControlledInput from "@/components/inputs/TextField";
import { useTheme } from "@/providers/ThemeContext";
import { View, Text } from "react-native";

type Props = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};

export const NoteDrawer: React.FC<Props> = ({ openModal, setOpenModal }) => {
  const { theme } = useTheme();
  return (
    <BottomPopup
      fullHeight
      closeIcon
      openModal={openModal}
      onClose={() => setOpenModal(false)}
    >
      <View
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
          Add a note to this entry
        </Text>
        <ControlledInput name="note" multiline />
        <View style={{ width: "100%" }}>
          <Button label="Add" onPress={() => setOpenModal(false)} />
        </View>
      </View>
    </BottomPopup>
  );
};
