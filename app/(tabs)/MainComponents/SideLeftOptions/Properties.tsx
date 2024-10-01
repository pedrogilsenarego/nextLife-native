import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { Button } from "./Button";
import { useState } from "react";
import { Card } from "@/components/Atoms/Card";
import useRealEstate from "@/hooks/useRealEstate";
import { Container } from "@/components/Atoms/Container";
import { ScrollView, Text, View } from "react-native";
import { Colors } from "@/providers/ThemeContext";

export const Properties = () => {
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const properties = useRealEstate();

  return (
    <>
      <Button onPress={() => setOpenPopup(true)} label="Properties" />
      <BottomPopup
        onClose={() => setOpenPopup(false)}
        title="Properties"
        fullHeight
        bgColor
        openModal={openPopup}
      >
        <BottomPopupContent
          styles={{ paddingHorizontal: 0, paddingVertical: 0 }}
        >
          <ScrollView
            style={{ height: "100%", borderWidth: 1, borderColor: "blue" }}
          >
            <Card
              paperStyles={{
                paddingHorizontal: 10,
                marginTop: 50,
                height: "100%",
                paddingTop: 60,
                overflow: "visible",
                flex: 1,
                position: "relative",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: -80,
                  zIndex: 10,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    borderRadius: 80,
                    paddingHorizontal: 20,
                    width: 60,
                    height: 60,
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 1,
                    elevation: 1,
                    backgroundColor: Colors.pearlWhite,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 26 }}>
                    {properties.data?.length}
                  </Text>
                </View>
              </View>
              {properties.data?.map((property) => {
                return (
                  <Container
                    key={property.id}
                    containerStyles={{ flexDirection: "column" }}
                  >
                    <Text>{property.address}</Text>
                    <Text style={{ fontSize: 20, fontWeight: 600 }}>
                      {property.marketValue}
                      <Text style={{ fontSize: 14 }}>€</Text>
                    </Text>
                  </Container>
                );
              })}
            </Card>
          </ScrollView>
        </BottomPopupContent>
      </BottomPopup>
    </>
  );
};
