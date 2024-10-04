import { useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import { FileObject } from "@supabase/storage-js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Colors, useTheme } from "@/providers/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import useUser from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { useRealEstate, useRealEstateImages } from "@/hooks/realEstate.hooks";
import { RealEstateImage } from "./RealEstateImage";
import { useMutation } from "@tanstack/react-query";
import { uploadRealEstateImage } from "@/actions/realEstateActions";

type Props = {
  propertyId: number | null;
};

export const PropertyContent: React.FC<Props> = (props) => {
  const user = useUser();
  const userData = user.data;
  const { mainColor } = useTheme();
  const properties = useRealEstate();
  const realEstateImages = useRealEstateImages({
    realEstateId: props.propertyId,
  });
  const propertyData = properties?.data?.find(
    (property) => property.id === props.propertyId
  );
  const [files, setFiles] = useState<FileObject[]>([]);

  const requestPermissions = async () => {
    const { status: mediaLibraryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (mediaLibraryStatus !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need access to your photo library to select images."
      );
      return false;
    }

    return true;
  };

  const onRemoveImage = async (item: FileObject, listIndex: number) => {
    supabase.storage.from("files").remove([`${userData!.id}/${item.name}`]);
    const newFiles = [...files];
    newFiles.splice(listIndex, 1);
    setFiles(newFiles);
  };

  const { mutate: uploadImageMutation, isPending } = useMutation({
    mutationFn: uploadRealEstateImage,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      realEstateImages.refetch();
    },
    onSettled: async () => {},
  });

  const onSelectImage = async () => {
    if (!props.propertyId || isPending) return;
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      const img = result.assets[0];
      uploadImageMutation({
        realEstateId: props.propertyId,
        img,
      });
    }
  };

  return (
    <View style={{ flex: 1, borderWidth: 1 }}>
      <Text>{propertyData?.address}</Text>
      <ScrollView>
        {realEstateImages.data?.map((item, index) => (
          <RealEstateImage
            propertyId={props.propertyId}
            key={item.id}
            item={item}
            onRemoveImage={() => onRemoveImage(item, index)}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={onSelectImage}
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 70,
          //position: "absolute",
          //   bottom: 40,
          //   right: 30,
          height: 70,
          backgroundColor: mainColor,
          borderRadius: 100,
        }}
      >
        {isPending ? (
          <ActivityIndicator size="large" color={Colors.pearlWhite} />
        ) : (
          <Ionicons name="camera" size={30} color={Colors.pearlWhite} />
        )}
      </TouchableOpacity>
    </View>
  );
};
