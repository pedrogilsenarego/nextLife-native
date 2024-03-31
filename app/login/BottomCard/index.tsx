import { useState } from "react";
import { Pressable, View, Text } from "react-native";
import Info from "../Info";
import BottomPopup from "@/components/BottomPopup";

const BottomCard = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <Pressable onPress={() => setOpenModal(true)}>
      <View
        style={{
          display: "flex",
          height: "15%",
          backgroundColor: "white",
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
          <Text style={{ marginTop: 20, fontWeight: "600" }}>About</Text>
          <Text>
            This project aims to foster a vibrant community by continually
            enhancing the application with new features and improved user
            experiences. Our goal is to provide users with a dynamic and
            evolving platform that adapts to their needs over time. To ensure
            the highest level of security for user data, we leverage third-party
            data centers, which entail associated costs. As the application
            grows, it may become necessary to implement monetization strategies
            to sustain its operation and further development efforts.
          </Text>
          <Text style={{ fontWeight: "600", marginTop: 3 }}>
            pedrogilsenarego@gmail.com
          </Text>
          <Text style={{ marginTop: 20, fontWeight: "600" }}>
            Version (1.0.0)
          </Text>
          <Text>Adding Expenses and Incomes</Text>
          <Text>Checking main Metrics</Text>
          <Text>Login, Logout and Register New User</Text>
        </View>
      </BottomPopup>
    </Pressable>
  );
};

export default BottomCard;
