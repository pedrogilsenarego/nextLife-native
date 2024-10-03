import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { Colors } from "@/providers/ThemeContext";
import { RealEstate } from "@/types/realEstateTypes";
import { Text, Image, View, Pressable } from "react-native";
import { useState } from "react";
import { PropertyContent } from "./PropertyContent";
type Props = {
  property: RealEstate;
};

export const PropertyItem: React.FC<Props> = (props) => {
  const [propertySelected, setPropertySelected] = useState<number | null>(null);
  return (
    <>
      <Pressable onPress={() => setPropertySelected(props.property.id)}>
        <Image
          source={{
            //uri: props.property.imageUrl
            uri: "https://images.squarespace-cdn.com/content/v1/5d46f43d6cfd4b000115ce8d/1627484985371-TDP0939FPUA4ESWIBXXW/Rua+Barao+Sabrosa+176-1.jpg",
          }}
          style={{
            flex: 1,
            height: 150,

            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.lightGray,
          }}
          resizeMode="cover"
        />
        <View>
          <Text>{props.property.address}</Text>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>
            {props.property.marketValue}
            <Text style={{ fontSize: 12 }}>€</Text>
          </Text>
        </View>
      </Pressable>
      <BottomPopup
        fullHeight
        openModal={!!propertySelected}
        onClose={() => setPropertySelected(null)}
      >
        <BottomPopupContent>
          <PropertyContent propertyId={propertySelected} />
        </BottomPopupContent>
      </BottomPopup>
    </>
  );
};
