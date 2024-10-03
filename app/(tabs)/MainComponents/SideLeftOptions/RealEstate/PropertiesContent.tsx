import { Card } from "@/components/Atoms/Card";
import { useRealEstate } from "@/hooks/realEstate.hooks";
import { Colors } from "@/providers/ThemeContext";
import { ScrollView, View, Text } from "react-native";
import { PropertyItem } from "./PropertyItem";

export const PropertiesContent = () => {
  const properties = useRealEstate();
  return (
    <ScrollView style={{ height: "100%" }}>
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
            <Text style={{ fontSize: 26 }}>{properties.data?.length}</Text>
          </View>
        </View>
        {properties.data?.map((property) => {
          return <PropertyItem key={property.id} property={property} />;
        })}
      </Card>
    </ScrollView>
  );
};
