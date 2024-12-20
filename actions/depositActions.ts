import { supabase } from "@/lib/supabase";
import { DepositQuery } from "@/types/depositTypes";

export const addDeposit = async ({
  depositName,
  type,
  amount,
}: {
  depositName: string;
  type: number;
  amount: number;
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

export const transferMoneyDepositToDeposit = async ({
  amount,
  transferFromId,
  transferToId,
}: {
  amount: number;
  transferFromId: number;
  transferToId: number;
}): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    console.log("transferMoneyDepositToDeposit");
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      // Fetch deposits
      const { data: fromDeposit, error: fromError } = await supabase
        .from("deposits")
        .select("*")
        .eq("id", transferFromId)
        .single();

      const { data: toDeposit, error: toError } = await supabase
        .from("deposits")
        .select("*")
        .eq("id", transferToId)
        .single();

      if (fromError || toError) {
        console.error("Error fetching deposits", fromError || toError);
        return reject(fromError || toError);
      }

      if (!fromDeposit || !toDeposit) {
        return reject(new Error("Deposits not found"));
      }

      if (fromDeposit.amount < amount) {
        return reject(new Error("Insufficient funds in the source deposit"));
      }

      // Begin transaction
      const { error: updateFromError } = await supabase
        .from("deposits")
        .update({ amount: fromDeposit.amount - amount })
        .eq("id", transferFromId);

      const { error: updateToError } = await supabase
        .from("deposits")
        .update({ amount: toDeposit.amount + amount })
        .eq("id", transferToId);

      if (updateFromError || updateToError) {
        console.error(
          "Error updating deposits",
          updateFromError || updateToError
        );
        return reject(updateFromError || updateToError);
      }

      resolve("Transfer successful");
    } catch (error) {
      console.error("Error during transfer", error);
      reject(error);
    }
  });
};

export const deleteDeposit = async (depositId: number): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    console.log("Deleting deposit with ID:", depositId);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { error: deleteError } = await supabase
        .from("deposits")
        .delete()
        .eq("id", depositId);

      if (deleteError) {
        console.error("Error deleting deposit:", deleteError);
        return reject(deleteError.message);
      }

      resolve("Deposit deleted successfully");
    } catch (error) {
      console.error("Error deleting deposit:", error);
      reject(error);
    }
  });
};
