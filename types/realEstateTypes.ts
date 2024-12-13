import {
  OwnershipType,
  PropertyType,
} from "@/hooks/RealEstate/realEstate.utils";

export type RealEstateQuery = RealEstate[];

export type RealEstate = {
  id: number;
  marketValue: number;
  size: number;
  address: string;
  vpt: number;
  ownershipType: OwnershipType;
  propertyType: PropertyType;
  municipality: string;
  isInRuins: boolean;
};
