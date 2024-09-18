import { ReportsQuery } from "@/types/reportsTypes";
import { supabase } from "@/lib/supabase";

export const getReports = async (): Promise<ReportsQuery> => {
  console.log("getingReports");
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { data: businesses, error: businessesError } = await supabase
        .from("reports")
        .select("*")
        .eq("user_id", user.id);

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
