import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { Colors } from "@/providers/ThemeContext";
import { RealEstate } from "@/types/realEstateTypes";
import { Text, Image, View, Pressable } from "react-native";
import { useState } from "react";
import { PropertyContent } from "./PropertyContent";
import { Container } from "@/components/Atoms/Container";
import {
  useRealEstateImage,
  useRealEstateImages,
} from "@/hooks/RealEstate/realEstate.hooks";
import Skeleton from "@/components/Atoms/Skeleton";
type Props = {
  property: RealEstate;
};

export const PropertyItem: React.FC<Props> = (props) => {
  //meter isto num contexto
  const [propertySelected, setPropertySelected] = useState<number | null>(null);
  const realEstateImagesList = useRealEstateImages({
    realEstateId: props.property.id,
  });
  const image = useRealEstateImage({
    realEstateId: props.property.id,
    imageName: realEstateImagesList.data?.[0].name,
  });

  const isLoading = realEstateImagesList.isLoading || image.isLoading;

  return (
    <>
      <View>
        {isLoading ? (
          <Skeleton style={{ width: "100%", height: 180 }} />
        ) : (
          <Pressable onPress={() => setPropertySelected(props.property.id)}>
            <View
              style={{
                flexDirection: "column",
                flex: 1,
                paddingHorizontal: 0,
                paddingVertical: 0,
                overflow: "hidden",
              }}
            >
              <Image
                source={{
                  uri: image.data,
                }}
                style={{
                  flex: 1,
                  height: 150,

                  width: "100%",

                  borderColor: Colors.lightGray,
                }}
                resizeMode="cover"
              />
              <View style={{ padding: 10 }}>
                <Text>{props.property.address}</Text>
                <Text style={{ fontSize: 16, fontWeight: 600 }}>
                  {props.property.marketValue}
                  <Text style={{ fontSize: 12 }}>€</Text>
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      </View>
      <BottomPopup
        fullHeight
        customBgColor={Colors.white}
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
