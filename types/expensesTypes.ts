export type Expense = {
  businessId: string;
  note: string;
  user_id: string;
  created_at: Date;
  id: string;
  category: string;
  amount: number;
  icon_type: number;
};

export type ExpensesQuery = Expense[];
