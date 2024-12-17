import { supabase } from "@/lib/supabase";
import { Expense } from "@/types/expensesTypes";

export const getExpenses = async ({
  timeRange,
}: {
  timeRange?: { startDate: Date; endDate: Date };
}): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    console.log(
      `gettingExpenses: from: ${timeRange?.startDate.toLocaleDateString()} to: ${timeRange?.endDate.toLocaleDateString()}`
    );

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }
      const currentDate = timeRange?.endDate || new Date();
      const currentMonthStart =
        timeRange?.startDate ||
        new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const nextDay = new Date(currentDate);
      nextDay.setDate(currentDate.getDate() + 1);
      const { data: expenses, error: expensesError } = await supabase
        .from("expenses")
        .select(
          `
        *,
        business:businessId (icon_type, business_name, type),
        deposits:deposit_id (deposit_name)
      `
        )
        .eq("user_id", user.id)
        .gte("created_at", currentMonthStart.toISOString())
        .lt("created_at", nextDay.toISOString())
        .order("created_at", { ascending: false });

      if (expensesError) {
        console.error(expensesError);
        return reject(expensesError);
      }

      resolve(expenses);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

type AddExpenseProps = {
  businessId: string;
  category: string;
  note?: string;
  amount: number;
  created_at: Date;
  depositId?: number;
};

export const addExpense = async (
  newExpenseData: AddExpenseProps
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    console.log("addExpense", newExpenseData.amount);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { businessId, note, amount, category, created_at, depositId } =
        newExpenseData;
      const user_id = user.id;

      const { error: expenseError } = await supabase.from("expenses").upsert([
        {
          businessId,
          note,
          amount,
          category,
          user_id: user_id,
          created_at,
          deposit_id: depositId,
        },
      ]);

      if (expenseError) {
        console.error(expenseError);
        return reject(expenseError);
      }

      if (depositId) {
        const { data: depositData, error: depositFetchError } = await supabase
          .from("deposits")
          .select("amount")
          .eq("id", depositId)
          .single();

        if (depositFetchError) {
          console.error(depositFetchError);
          return reject(depositFetchError);
        }

        const newAmount = depositData.amount - amount;

        const { error: depositUpdateError } = await supabase
          .from("deposits")
          .update({
            amount: newAmount,
          })
          .eq("id", depositId);

        if (depositUpdateError) {
          console.error(depositUpdateError);
          return reject(depositUpdateError);
        }
      }

      resolve("Success");
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const deleteExpense = async (expenseId: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      // Fetch the expense to get the deposit_id and amount
      const { data: expense, error: fetchError } = await supabase
        .from("expenses")
        .select("*")
        .eq("id", expenseId)
        .single();

      if (fetchError) {
        console.error(fetchError);
        return reject(fetchError);
      }

      if (!expense) {
        return reject(new Error("Expense not found"));
      }

      const { deposit_id, amount } = expense;

      // Delete the expense
      const { error: deleteError } = await supabase
        .from("expenses")
        .delete()
        .eq("id", expenseId);

      if (deleteError) {
        console.error(deleteError);
        return reject(deleteError);
      }

      if (deposit_id) {
        const { data: depositData, error: depositFetchError } = await supabase
          .from("deposits")
          .select("amount")
          .eq("id", deposit_id)
          .single();

        if (depositFetchError) {
          console.error(depositFetchError);
          return reject(depositFetchError);
        }

        const newAmount = depositData.amount + amount;

        const { error: depositUpdateError } = await supabase
          .from("deposits")
          .update({
            amount: newAmount,
          })
          .eq("id", deposit_id);

        if (depositUpdateError) {
          console.error(depositUpdateError);
          return reject(depositUpdateError);
        }
      }

      resolve({ message: "Expense deleted and deposit updated successfully" });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
type UpdateExpenseProps = {
  transactionId: string;
  originalDepositId?: number;
  updatedFields: Partial<{
    businessId?: string;
    category?: string;
    note?: string;
    amount?: number;
    created_at?: Date;
    deposit_id?: number;
  }>;
};

export const updateExpense = async ({
  transactionId,
  updatedFields,
}: UpdateExpenseProps): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      // Fetch the existing expense
      const { data: existingExpense, error: fetchError } = await supabase
        .from("expenses")
        .select("*")
        .eq("id", transactionId)
        .single();

      if (fetchError) {
        console.error(fetchError);
        return reject(fetchError);
      }

      if (!existingExpense) {
        return reject(new Error("Expense not found"));
      }

      const { deposit_id: existingDepositId, amount: existingAmount } =
        existingExpense;

      const {
        deposit_id: newDepositId = null, // Default to null if undefined
        amount: newAmount = existingAmount,
      } = updatedFields;

      // Update the expense
      const { error: expenseError } = await supabase
        .from("expenses")
        .update(updatedFields)
        .eq("id", transactionId);

      if (expenseError) {
        console.error(expenseError);
        return reject(expenseError);
      }

      // If deposit ID has changed or amount needs updating
      if (newDepositId !== existingDepositId || newAmount !== existingAmount) {
        // Handle the old deposit update if it exists
        if (existingDepositId) {
          const { data: oldDeposit, error: oldDepositError } = await supabase
            .from("deposits")
            .select("amount")
            .eq("id", existingDepositId)
            .single();

          if (oldDepositError) {
            console.error(oldDepositError);
            return reject(oldDepositError);
          }

          // Add back the original amount to the old deposit
          const updatedOldAmount = oldDeposit.amount + existingAmount;
          const { error: updateOldDepositError } = await supabase
            .from("deposits")
            .update({ amount: updatedOldAmount })
            .eq("id", existingDepositId);

          if (updateOldDepositError) {
            console.error(updateOldDepositError);
            return reject(updateOldDepositError);
          }
        }

        // Handle the new deposit update if a new deposit ID is provided
        if (newDepositId) {
          const { data: newDeposit, error: newDepositError } = await supabase
            .from("deposits")
            .select("amount")
            .eq("id", newDepositId)
            .single();

          if (newDepositError) {
            console.error(newDepositError);
            return reject(newDepositError);
          }

          // Subtract the new amount from the new deposit
          const updatedNewAmount = newDeposit.amount - newAmount;
          const { error: updateNewDepositError } = await supabase
            .from("deposits")
            .update({ amount: updatedNewAmount })
            .eq("id", newDepositId);

          if (updateNewDepositError) {
            console.error(updateNewDepositError);
            return reject(updateNewDepositError);
          }
        }
      } else if (existingDepositId && newDepositId === null) {
        // Case 3: No new deposit ID, but we have an existing deposit ID
        const { data: oldDeposit, error: oldDepositError } = await supabase
          .from("deposits")
          .select("amount")
          .eq("id", existingDepositId)
          .single();

        if (oldDepositError) {
          console.error(oldDepositError);
          return reject(oldDepositError);
        }

        // Add back the original amount to the old deposit
        const updatedOldAmount = oldDeposit.amount + existingAmount;
        const { error: updateOldDepositError } = await supabase
          .from("deposits")
          .update({ amount: updatedOldAmount })
          .eq("id", existingDepositId);

        if (updateOldDepositError) {
          console.error(updateOldDepositError);
          return reject(updateOldDepositError);
        }
      }

      resolve("Success");
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
