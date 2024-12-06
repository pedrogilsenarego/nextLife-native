export type CarsQuery = Car[];

export type Car = {
  id: string;
  userId: string;
  createdAt: string;
  value: number;
  brand: string;
  model: string;
  licenseDate: string;
};
