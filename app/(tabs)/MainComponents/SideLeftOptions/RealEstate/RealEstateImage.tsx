import { FileObject } from "@supabase/storage-js";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRealEstateImage } from "@/hooks/RealEstate/realEstate.hooks";

export const RealEstateImage = ({
  item,

  onRemoveImage,
  propertyId,
}: {
  propertyId: number | null;
  item: FileObject;

  onRemoveImage: () => void;
}) => {
  const image = useRealEstateImage({
    realEstateId: propertyId,
    imageName: item.name,
  });

  return (
    <View
      style={{ flexDirection: "row", margin: 1, alignItems: "center", gap: 5 }}
    >
      {image ? (
        <Image style={{ width: 80, height: 80 }} source={{ uri: image.data }} />
      ) : (
        <View style={{ width: 80, height: 80, backgroundColor: "#1A1A1A" }} />
      )}
      <Text style={{ flex: 1, color: "#fff" }}>{item.name}</Text>
      <TouchableOpacity onPress={onRemoveImage}>
        <Ionicons name="trash-outline" size={20} color={"#fff"} />
      </TouchableOpacity>
    </View>
  );
};
