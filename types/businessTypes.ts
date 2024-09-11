export type BusinessQuery = Business[];

export type Business = {
  businessName: string;
  user_id: string;
  created_at: Date;
  id: string;
  type: number;
  iconType: number;
  settings: {
    filters: {
      balanceStatus: boolean;
    };
  };
};
