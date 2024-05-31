import BottomPopup from "@/components/BottomPopup";
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
      </View>
    </BottomPopup>
  );
};
