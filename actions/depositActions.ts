import { supabase } from "@/lib/supabase";
import { DepositQuery } from "@/types/depositTypes";

export const addDeposit = async ({
  depositName,
  type,
  amount,
}: {
  depositName: string;
  type: number;
  amount?: string;
}): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    console.log("addDeposit", depositName);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { error: userError } = await supabase.from("deposits").upsert([
        {
          deposit_name: depositName,
          deposit_type: type,
          user_id: user.id,
          amount,
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

export const getDeposits = async (): Promise<DepositQuery> => {
  console.log("getingDeposits");
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { data: deposits, error: depositsError } = await supabase
        .from("deposits")
        .select("*")
        .eq("user_id", user.id);

      if (depositsError) {
        console.error("error", depositsError);
        return reject(depositsError);
      }

      const formattedDeposits: DepositQuery = deposits.map((deposit: any) => ({
        userId: deposit.user_id,
        depositType: deposit.deposit_type,
        id: deposit.id,
        createdAt: deposit.created_at,
        depositName: deposit.deposit_name,
        amount: deposit.amount,
      }));

      resolve(formattedDeposits || []);
    } catch (error) {
      console.error("error", error);
      reject(error);
    }
  });
};
