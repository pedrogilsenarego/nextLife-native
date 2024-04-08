import useUser from "@/hooks/useUser";
import { View, Text } from "react-native";

const MainCard = () => {
  const userQuery = useUser();
  return (
    <View style={{ padding: 22 }}>
      <Text style={{ color: "white", fontSize: 20 }}>
        Hello,{" "}
        <Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>
          {userQuery?.data?.username}
        </Text>
      </Text>
      <Text style={{ color: "whitesmoke" }}>Your balance</Text>
    </View>
  );
};

export default MainCard;
