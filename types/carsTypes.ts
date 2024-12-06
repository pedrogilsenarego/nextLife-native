export type CarsQuery = Car[];

export type Car = {
  id: string;
  userId: string;
  createdAt: string;
  value: number;
  brand: string;
  model: string;
  licenseDate: string;
  cc: number;
  typeFuel: FuelType;
  co2: number;
};

export type FuelType = "gasoline" | "diesel" | "hybrid" | "electric";
