import useRealEstate from "@/hooks/useRealEstate";
import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { FileObject } from "@supabase/storage-js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Colors, useTheme } from "@/providers/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import useUser from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";
//import ImageItem from "./ImageItem";

type Props = {
  propertyId: number | null;
};

export const PropertyContent: React.FC<Props> = (props) => {
  const user = useUser();
  const userData = user.data;
  const { mainColor } = useTheme();
  const properties = useRealEstate();
  const propertyData = properties?.data?.find(
    (property) => property.id === props.propertyId
  );
  const [files, setFiles] = useState<FileObject[]>([]);

  //   const loadImages = async () => {
  //     const { data } = await supabase.storage
  //       .from("real_estate_files")
  //       .list(userData!.id);
  //     if (data) {
  //       setFiles(data);
  //     }
  //   };

  //   const onRemoveImage = async (item: FileObject, listIndex: number) => {
  //     supabase.storage.from("files").remove([`${userData!.id}/${item.name}`]);
  //     const newFiles = [...files];
  //     newFiles.splice(listIndex, 1);
  //     setFiles(newFiles);
  //   };

  const onSelectImage = async () => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      const img = result.assets[0];
      const base64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: "base64",
      });
      const filePath = `${userData!.id}/${new Date().getTime()}.${
        img.type === "image" ? "png" : "mp4"
      }`;
      const contentType = img.type === "image" ? "image/png" : "video/mp4";
      await supabase.storage
        .from("real_estate_files")
        .upload(filePath, decode(base64), { contentType });
      //loadImages();
    }
  };

  return (
    <View style={{ flex: 1, borderWidth: 1 }}>
      <Text>{propertyData?.address}</Text>
      {/* <ScrollView>
        {files.map((item, index) => (
          <ImageItem
            key={item.id}
            item={item}
            userId={userData!.id}
            onRemoveImage={() => onRemoveImage(item, index)}
          />
        ))}
      </ScrollView> */}
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
        <Ionicons name="camera" size={30} color={Colors.pearlWhite} />
      </TouchableOpacity>
    </View>
  );
};
