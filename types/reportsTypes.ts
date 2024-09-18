export type ReportsQuery = Report[];

export type Report = {
  deposits: any;
  userId: string;
  createdAt: Date;
  id: string;
  patrimony: number;
};
