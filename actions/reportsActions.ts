import { ReportsQuery } from "@/types/reportsTypes";
import { supabase } from "@/lib/supabase";

export const getReports = async ({
  timeRange,
}: {
  timeRange?: { startDate: Date; endDate: Date };
}): Promise<ReportsQuery> => {
  console.log(
    `gettingReports: from: ${timeRange?.startDate.toLocaleDateString()} to: ${timeRange?.endDate.toLocaleDateString()}`
  );
  return new Promise(async (resolve, reject) => {
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

      const { data: businesses, error: businessesError } = await supabase
        .from("reports")
        .select("*")
        .eq("user_id", user.id)
        .gt("created_at", currentMonthStart.toISOString())
        .lt("created_at", currentDate.toISOString())
        .order("created_at", { ascending: true });

      if (businessesError) {
        console.error("error", businessesError);
        return reject(businessesError);
      }

      const formattedBusinesses: ReportsQuery = businesses.map(
        (business: any) => ({
          userId: business.user_id,
          patrimony: business.patrimony,
          id: business.id,
          createdAt: business.created_at,
          deposits: business.deposits,
        })
      );

      resolve(formattedBusinesses || []);
    } catch (error) {
      console.error("error", error);
      reject(error);
    }
  });
};
