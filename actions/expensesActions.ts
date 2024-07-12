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

      const { data: expenses, error: expensesError } = await supabase
        .from("expenses")
        .select(
          `
        *,
        business:businessId (icon_type)
      `
        )
        .eq("user_id", user.id)
        .gt("created_at", currentMonthStart.toISOString())
        .lt("created_at", currentDate.toISOString())
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

export const deleteExpenses = async (
  expensesToDelete: string[]
): Promise<string> => {
  console.log("deleting Expenses");
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      // Delete expenses based on the provided IDs
      const { error: deleteError } = await supabase
        .from("expenses")
        .delete()
        .in(
          "id",
          expensesToDelete.map((expense) => expense)
        );

      if (deleteError) {
        console.error(deleteError);
        return reject(deleteError);
      }

      resolve("Success");
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
