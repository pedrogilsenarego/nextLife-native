import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import Button from "@/components/button/ButtonComponent";
import Select from "@/components/inputs/Select";

import { Colors, useTheme } from "@/providers/ThemeContext";
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
      openModal={openModal}
      title="Deposits"
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
              Choose the Deposit for this entry
            </Text>
            <Text
              style={{
                color: Colors.steelGray,
                fontSize: 12,
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              This helps to track your patrimony variation
            </Text>
          </View>
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
      </BottomPopupContent>
    </BottomPopup>
  );
};
