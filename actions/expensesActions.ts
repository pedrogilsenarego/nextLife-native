import { supabase } from "@/lib/supabase";

export const getExpenses = async ({
  timeRange,
  userId,
}: {
  timeRange?: { startDate: Date; endDate: Date };
  userId: string;
}): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    console.log(
      `gettingExpenses: from: ${timeRange?.startDate.toLocaleDateString()} to: ${timeRange?.endDate.toLocaleDateString()}`
    );

    try {
      const currentDate = timeRange?.endDate || new Date();
      const currentMonthStart =
        timeRange?.startDate ||
        new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

      const { data: expenses, error: expensesError } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", userId)
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
