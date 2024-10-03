import {
  getRealEstate,
  getRealEstateImage,
  getRealEstateImagesList,
} from "@/actions/realEstateActions";
import { queryKeys } from "@/constants/queryKeys";
import { RealEstateQuery } from "@/types/realEstateTypes";
import { FileObject } from "@supabase/storage-js";

import { useQuery } from "@tanstack/react-query";

const useRealEstate = () => {
  const realEstate = useQuery<RealEstateQuery, Error>({
    queryKey: [queryKeys.realEstate],
    queryFn: getRealEstate,
  });

  return realEstate;
};

type RealEstateImagesProps = {
  realEstateId: number | null;
};

const useRealEstateImages = (props: RealEstateImagesProps) => {
  const realEstate = useQuery<FileObject[], Error>({
    queryKey: [queryKeys.realEstateImages, props.realEstateId],
    queryFn: () => {
      if (props.realEstateId === null) {
        return Promise.reject(new Error("realEstateId cannot be null"));
      }
      return getRealEstateImagesList({ realEstateId: props.realEstateId });
    },
    enabled: props.realEstateId !== null,
  });

  return realEstate;
};

type RealEstateImageProps = {
  realEstateId: number | null;
  imageName: string | undefined;
};

const useRealEstateImage = (props: RealEstateImageProps) => {
  const realEstate = useQuery<string, Error>({
    queryKey: [queryKeys.realEstateImage, props.realEstateId, props.imageName],
    queryFn: () => {
      if (props.realEstateId === null || props.imageName === undefined) {
        return Promise.reject(new Error("realEstateId cannot be null"));
      }
      return getRealEstateImage({
        realEstateId: props.realEstateId,
        imageName: props.imageName,
      });
    },
    enabled: props.realEstateId !== null && props.imageName !== undefined,
  });

  return realEstate;
};

export { useRealEstate, useRealEstateImages, useRealEstateImage };
