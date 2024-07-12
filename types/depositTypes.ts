export type DepositQuery = Deposit[];

export type Deposit = {
  depositName: string;
  userId: string;
  createdAt: Date;
  id: string;
  depositType: number;
};
