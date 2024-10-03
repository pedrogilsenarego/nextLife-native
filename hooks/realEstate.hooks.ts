import {
  getRealEstate,
  getRealEstateImages,
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
      return getRealEstateImages({ realEstateId: props.realEstateId });
    },
    enabled: props.realEstateId !== null,
  });

  return realEstate;
};

export { useRealEstate, useRealEstateImages };
