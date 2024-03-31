import { View, Text, Pressable } from "react-native";
import Forms from "../Forms";
import { useModal } from "@/providers/ModalContext";

const MainCard = () => {
  const { createDialog } = useModal();
  return (
    <View
      style={{
        display: "flex",
        backgroundColor: "white",
        height: "88%",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 4,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },

        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Forms />
      <Text
        style={{
          borderBottomWidth: 2,
          borderColor: "white",
          fontWeight: "500",
          color: "gray",
        }}
      >
        Forgot Password?
      </Text>
    </View>
  );
};

export default MainCard;
