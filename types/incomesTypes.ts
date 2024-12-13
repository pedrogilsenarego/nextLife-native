export type Income = {
  businessId: string;
  note: string;
  user_id: string;
  created_at: Date;
  id: string;
  category: string;
  amount: number;
  is_iva_isent: boolean;
  deposit_id: number;
  business: {
    icon_type: number;
    business_name: string;
    type: number;
  };
  deposits: {
    deposit_name: string;
  };
};

export type IncomesQuery = Income[];
