import { CreditQuery } from "@/types/creditsTypes";
import { supabase } from "@/lib/supabase";
export const getCredits = async (): Promise<CreditQuery> => {
  console.log("getingCredits");
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { data: deposits, error: depositsError } = await supabase
        .from("credits")
        .select("*")
        .eq("user_id", user.id);

      if (depositsError) {
        console.error("error", depositsError);
        return reject(depositsError);
      }

      const formattedCredits: CreditQuery = deposits.map((deposit: any) => ({
        userId: deposit.user_id,
        initialAmount: deposit.initial_amount,
        id: deposit.id,
        createdAt: deposit.created_at,
        currentAmount: deposit.current_amount,
        rate: deposit.rate,
      }));

      resolve(formattedCredits || []);
    } catch (error) {
      console.error("error", error);
      reject(error);
    }
  });
};
