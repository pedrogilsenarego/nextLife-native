import { supabase } from "@/lib/supabase";
import { RealEstateQuery } from "@/types/realEstateTypes";
import { FileObject } from "@supabase/storage-js";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";

export const getRealEstate = async (): Promise<RealEstateQuery> => {
  console.log("getingRealEstate");
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { data: deposits, error: depositsError } = await supabase
        .from("real_estate")
        .select("*")
        .eq("user_id", user.id);

      if (depositsError) {
        console.error("error", depositsError);
        return reject(depositsError);
      }

      const formattedRealEstate: RealEstateQuery = deposits.map(
        (deposit: any) => ({
          userId: deposit.user_id,
          size: deposit.size,
          id: deposit.id,
          address: deposit.address,
          createdAt: deposit.created_at,
          marketValue: deposit.market_value,
          vpt: deposit.vpt,
          ownershipType: deposit.ownership_type,
          propertyType: deposit.property_type,
          municipality: deposit.municipality,
        })
      );

      resolve(formattedRealEstate || []);
    } catch (error) {
      console.error("error", error);
      reject(error);
    }
  });
};

type RealEstatProps = {
  realEstateId: number;
};

export const getRealEstateImagesList = async (
  props: RealEstatProps
): Promise<FileObject[]> => {
  console.log(`getingRealEstateImages_${props.realEstateId}`);
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { data, error } = await supabase.storage
        .from("real_estate_files")
        .list(`${user!.id}/${props.realEstateId}`);

      if (error) {
        console.error("error", error);
        return reject(error);
      }

      resolve(data);
    } catch (error) {
      console.error("error", error);
      reject(error);
    }
  });
};

type RealEstateImageProps = {
  realEstateId: number;
  imageName: string;
};

export const getRealEstateImage = async (
  props: RealEstateImageProps
): Promise<string> => {
  console.log(`getingRealEstateImage_${props.realEstateId}_${props.imageName}`);
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      await supabase.storage
        .from("real_estate_files")
        .download(`${user.id}/${props.realEstateId}/${props.imageName}`)
        .then(({ data }) => {
          const fr = new FileReader();
          fr.readAsDataURL(data!);
          fr.onload = () => {
            resolve(fr.result as string);
          };
        });
    } catch (error) {
      console.error("error", error);
      reject(error);
    }
  });
};

type UploadRealEstateImageProps = {
  realEstateId: number;
  img: ImagePicker.ImagePickerAsset;
};

export const uploadRealEstateImage = async (
  props: UploadRealEstateImageProps
): Promise<void> => {
  console.log(`uploadingRealEstateImage_${props.realEstateId}`);
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const imgUri = props.img.uri;
      const imgType = props.img.type === "image" ? "image" : "video";

      const base64 = await FileSystem.readAsStringAsync(imgUri, {
        encoding: "base64",
      });

      const filePath = `${user!.id}/${
        props.realEstateId
      }/${new Date().getTime()}.${imgType === "image" ? "png" : "mp4"}`;

      const contentType = imgType === "image" ? "image/png" : "video/mp4";

      await supabase.storage
        .from("real_estate_files")
        .upload(filePath, decode(base64), { contentType });
      resolve();
    } catch (error) {
      console.error("error", error);
      reject(error);
    }
  });
};
