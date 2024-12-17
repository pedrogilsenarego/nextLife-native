import { Categories } from "@/constants/categories";

export type Expense = {
  businessId: string;
  note: string;
  user_id: string;
  created_at: Date;
  id: string;
  category: Categories;
  amount: number;
  icon_type: number;
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

export type ExpensesQuery = Expense[];
