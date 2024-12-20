export type BusinessInvestmentParcelsQuery = BusinessInvestmentParcel[];

export type BusinessInvestmentParcel = {
  description: string;
  businessId: string;
  createdAt: Date;
  id: string;
  amount: number;
};
