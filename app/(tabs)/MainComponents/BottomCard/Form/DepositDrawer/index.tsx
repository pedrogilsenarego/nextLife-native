import BottomPopup from "@/components/BottomPopup";
import Button from "@/components/button/ButtonComponent";
import Select from "@/components/inputs/Select";

import { useTheme } from "@/providers/ThemeContext";
import { View, Text, Pressable, Keyboard } from "react-native";

type Props = {
  name?: string;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  depositList: { label: string; value: number | undefined }[];
};

export const DepositDrawer: React.FC<Props> = ({
  openModal,
  setOpenModal,
  depositList,
  name,
}) => {
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
          Choose the Deposit associated with this transaction
        </Text>
        <View style={{ width: "100%" }}>
          <Select
            height={160}
            style={{ borderTopRightRadius: 6 }}
            name={name || "depositId"}
            listOptions={depositList || []}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Button label="Change" onPress={() => setOpenModal(false)} />
        </View>
      </Pressable>
    </BottomPopup>
  );
};
