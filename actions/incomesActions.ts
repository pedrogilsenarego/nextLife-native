import { supabase } from "@/lib/supabase";

export const getIncomes = async ({
  timeRange,
}: {
  timeRange?: { startDate: Date; endDate: Date };
}): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    console.log(
      `gettingIncomes: from: ${timeRange?.startDate.toLocaleDateString()} to: ${timeRange?.endDate.toLocaleDateString()}`
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
