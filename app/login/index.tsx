import { View } from "@/components/Themed";
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";

import BottomCard from "./BottomCard";
import MainCard from "./MainCard";

const Login = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "orangered" }}>
      <StatusBar barStyle={"light-content"} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={{ backgroundColor: "orangered", display: "flex", rowGap: 3 }}
        >
          <MainCard />
          <BottomCard />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Login;
