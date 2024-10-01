import { supabase } from "@/lib/supabase";
import { RealEstateQuery } from "@/types/realEstateTypes";
export const getRealEstate = async (): Promise<RealEstateQuery> => {
  console.log("getingRealEstate");
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { data: deposits, error: depositsError } = await supabase
        .from("real_estate")
        .select("*")
        .eq("user_id", user.id);

      if (depositsError) {
        console.error("error", depositsError);
        return reject(depositsError);
      }

      const formattedRealEstate: RealEstateQuery = deposits.map(
        (deposit: any) => ({
          userId: deposit.user_id,
          size: deposit.size,
          id: deposit.id,
          address: deposit.address,
          createdAt: deposit.created_at,
          marketValue: deposit.market_value,
        })
      );

      resolve(formattedRealEstate || []);
    } catch (error) {
      console.error("error", error);
      reject(error);
    }
  });
};
