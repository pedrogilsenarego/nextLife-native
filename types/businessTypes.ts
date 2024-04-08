export type BusinessQuery = {
  businessName: string;
  user_id: string;
  created_at: Date;
  id: string;
  type: number;
  settings: {
    filters: {
      balanceStatus: boolean;
    };
  };
}[];
