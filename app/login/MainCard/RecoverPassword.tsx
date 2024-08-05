import { View, Text, Pressable } from "react-native";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { RecoverPasswordModal } from "./RecoverPasswordModal";

export const RecoverPassword: React.FC = () => {
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  return (
    <>
      <Pressable
        onPress={() => setOpenPopup(true)}
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
      </Pressable>
      <BottomPopup
        title="Recover Password"
        openModal={openPopup}
        onClose={() => setOpenPopup(false)}
      >
        <RecoverPasswordModal />
      </BottomPopup>
    </>
  );
};
