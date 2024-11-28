import { supabase } from "@/lib/supabase";
import { WatchQuery } from "@/types/watchesTypes";

export const getWatches = async (): Promise<WatchQuery> => {
  console.log("getingWatches");
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { data: deposits, error: depositsError } = await supabase
        .from("watches")
        .select("*")
        .eq("user_id", user.id);

      if (depositsError) {
        console.error("error", depositsError);
        return reject(depositsError);
      }

      const formattedWatches: WatchQuery = deposits.map((deposit: any) => ({
        userId: deposit.user_id,
        brand: deposit.brand,
        id: deposit.id,
        model: deposit.model,
        year: deposit.year,
        createdAt: deposit.created_at,
        value: deposit.value,
        reference: deposit.reference,
      }));

      resolve(formattedWatches || []);
    } catch (error) {
      console.error("error", error);
      reject(error);
    }
  });
};
