import Carousel from "react-native-reanimated-carousel";
import { Dimensions, Keyboard, Pressable, Text, View } from "react-native";
import MainCard from "./MainCard";
import Info from "./Info";
import LoginLayout from "@/layouts/LoginLayout";

const Login = () => {
  const width = Dimensions.get("window").width;
  const MainContent = () => {
    return (
      <Carousel
        width={width}
        style={{ paddingBottom: 10 }}
        data={[...new Array(2).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) =>
          index === 0 ? (
            <MainCard />
          ) : (
            <Pressable
              onPress={Keyboard.dismiss}
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: 30,
              }}
            >
              <Text
                style={{
                  marginTop: 20,
                  fontWeight: "600",
                  color: "white",
                  fontSize: 20,
                }}
              >
                About
              </Text>
              <Text style={{ color: "whitesmoke", marginTop: 6 }}>
                This project aims to foster a vibrant community by continually
                enhancing the application with new features and improved user
                experiences.
                {`\n`}
                {`\n`} Our goal is to provide users with a dynamic and evolving
                platform that adapts to their needs over time. To ensure the
                highest level of security for user data, we leverage third-party
                data centers, which entail associated costs.{`\n`}
                {`\n`} As the application grows, it may become necessary to
                implement monetization strategies to sustain its operation and
                further development efforts.{`\n`}
                {"\n"}
                <Text style={{ fontWeight: "600" }}>
                  pedrogilsenarego@gmail.com
                </Text>
              </Text>
            </Pressable>
          )
        }
      />
    );
  };
  const SecondaryContent = () => {
    return (
      <>
        <Info />

        <View style={{ width: "100%", paddingHorizontal: 30 }}>
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
      </>
    );
  };
  return (
    <LoginLayout
      mainContent={<MainContent />}
      secondaryContent={<SecondaryContent />}
    />
  );
};

export default Login;
