import { Card } from "@/components/Atoms/Card";
import { Container } from "@/components/Atoms/Container";

import { View, Text, Pressable, ScrollView } from "react-native";

const Options = () => {
  return (
    <Card>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        style={{
          marginHorizontal: 10,
          borderRadius: 8,

          position: "relative",
          height: "100%",
        }}
      >
        <Pressable>
          <View style={{ height: 100, width: "100%", paddingHorizontal: 4 }}>
            <Container>
              <Text>Teste</Text>
            </Container>
          </View>
        </Pressable>
      </ScrollView>
    </Card>
  );
};

export default Options;
