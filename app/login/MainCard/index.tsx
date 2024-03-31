import { View, Text, Pressable } from "react-native";
import Forms from "../Forms";
import { useModal } from "@/providers/ModalContext";
import LottieView from "lottie-react-native";

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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          columnGap: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "500",
            color: "gray",
            lineHeight: 27,
          }}
        >
          Forgot Password?
        </Text>
        <LottieView
          autoPlay
          style={{
            width: 40,
            aspectRatio: 1,
            opacity: 0.2,
          }}
          source={require("../../../assets/images/Initial.json")}
        />
      </View>
    </View>
  );
};

export default MainCard;
