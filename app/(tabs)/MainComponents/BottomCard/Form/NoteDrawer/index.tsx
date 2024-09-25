import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import Button from "@/components/button/ButtonComponent";
import ControlledInput from "@/components/inputs/TextField";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { View, Text, Pressable, Keyboard } from "react-native";

type Props = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};

export const NoteDrawer: React.FC<Props> = ({ openModal, setOpenModal }) => {
  const { theme } = useTheme();
  return (
    <BottomPopup
      fullHeight
      title="Node"
      openModal={openModal}
      onClose={() => setOpenModal(false)}
    >
      <BottomPopupContent>
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
                fontWeight: 500,
              }}
            >
              Write a Note for this entry
            </Text>
            <Text
              style={{
                color: Colors.steelGray,
                fontSize: 12,
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              Write up to 20 words
            </Text>
          </View>
          <ControlledInput name="note" multiline />
          <View style={{ width: "100%" }}>
            <Button label="Add" onPress={() => setOpenModal(false)} />
          </View>
        </Pressable>
      </BottomPopupContent>
    </BottomPopup>
  );
};
