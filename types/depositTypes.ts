export type DepositQuery = Deposit[];

export type Deposit = {
  depositName: string;
  userId: string;
  createdAt: Date;
  id: number;
  depositType: number;
};
