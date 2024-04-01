import { useState } from "react";
import { Pressable, View, Text } from "react-native";
import Info from "../Info";
import BottomPopup from "@/components/BottomPopup";
import { useTheme } from "@/providers/ThemeContext";

const BottomCard = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { theme } = useTheme();

  return (
    <Pressable onPress={() => setOpenModal(true)}>
      <View
        style={{
          display: "flex",
          height: "15%",
          backgroundColor: theme === "light" ? "white" : "black",
          marginHorizontal: 4,
          alignItems: "center",
          justifyContent: "center",

          borderRadius: 12,
          shadowColor: "#000",

          paddingTop: 18,
          paddingBottom: 100,
          shadowOffset: {
            width: 0,
            height: 2,
          },

          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5, // Android only
        }}
      >
        <Info />
      </View>
      <BottomPopup openModal={openModal} onClose={() => setOpenModal(false)}>
        <View style={{ display: "flex" }}>
          <View style={{ display: "flex", alignItems: "center" }}>
            <Info />
          </View>
          <Text style={{ marginTop: 20, fontWeight: "600" }}>
            Version (1.0.0)
          </Text>
          <Text style={{ marginTop: 5 }}>
            &#183; Adding Expenses and Incomes
          </Text>
          <Text>&#183; Checking main Metrics</Text>
          <Text>&#183; Login, Logout and Register New User</Text>
          <Text>&#183; Change Main Color</Text>
          <Text>&#183; Change Theme</Text>
        </View>
      </BottomPopup>
    </Pressable>
  );
};

export default BottomCard;
