import { View, Text, Pressable, Linking } from "react-native";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { RecoverPasswordModal } from "./RecoverPasswordModal";

export const RecoverPassword: React.FC = () => {
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const handlePress = () => {
    //setOpenPopup(true)
    const url = "https://zyr-o.com/recover-password";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };
  return (
    <>
      <Pressable
        onPress={handlePress}
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
        <RecoverPasswordModal setOpenPopup={setOpenPopup} />
      </BottomPopup>
    </>
  );
};
