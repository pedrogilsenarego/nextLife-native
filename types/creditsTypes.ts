export type CreditQuery = Credit[];

export type Credit = {
  initialAmount: number;
  currentAmount: number;
  userId: string;
  rate: number;
};
