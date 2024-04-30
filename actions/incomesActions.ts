import { supabase } from "@/lib/supabase";

export const getIncomes = async ({
  timeRange,
}: {
  timeRange: { startDate: Date; endDate: Date };
}): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    console.log(
      `gettingIncomes: from: ${timeRange?.startDate.toLocaleDateString()} to: ${timeRange?.endDate.toISOString()}`
    );

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const currentDate = timeRange?.endDate;
      const currentMonthStart =
        timeRange?.startDate ||
        new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

      const { data: expenses, error: expensesError } = await supabase
        .from("incomes")
        .select("*")
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

type AddIncomeProps = {
  businessId: string;
  category: string;
  note?: string;
  amount: number;
  created_at: Date;
};

export const addIncome = async (
  newExpenseData: AddIncomeProps
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    console.log("addIncome", newExpenseData.amount);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { businessId, note, amount, category, created_at } = newExpenseData;
      const user_id = user.id;

      const { error: userError } = await supabase.from("incomes").upsert([
        {
          businessId,
          note,
          amount,
          category,
          user_id: user_id,
          created_at,
        },
      ]);

      if (userError) {
        console.error(userError);
        return reject(userError);
      }

      resolve("Success");
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const deleteIncomes = async (
  expensesToDelete: string[]
): Promise<string> => {
  console.log("deleting Incomes");
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
        .from("incomes")
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
