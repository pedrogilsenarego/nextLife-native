import { supabase } from "@/lib/supabase";
import { UserQuery } from "@/types/userTypes";
export const recoverPassword = async ({
  email,
}: {
  email: string;
}): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        reject(error?.message);
      } else {
        resolve("Password reset email sent successfully");
      }
    } catch (error: any) {
      console.log("error", error);
      reject(error.message);
    }
  });
};

export const signinUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const session = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (session.error) {
        reject(session?.error?.message || "Could not autenticate user");
      }
    } catch (error) {
      console.error("error", error);
      reject(error);
    }
  });
};

export const signupUser = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            displayName: username,
          },
        },
      });

      if (error) {
        reject(error?.message);
      }
      return resolve("Welcome to NextLife enjoy");
    } catch (error: any) {
      console.error("error", error);
      reject(error.message);
    }
  });
};

export const getUserData = async (): Promise<UserQuery> => {
  console.log("getingUser");
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { data: userData, error: userDataError } = await supabase
        .from("users")
        .select()
        .eq("id", user.id)
        .single();

      if (userDataError) {
        console.error("error", userDataError);
        return reject(userDataError);
      }

      resolve(userData);
    } catch (error) {
      console.error("error", error);
      reject(error);
    }
  });
};

export const updateDepositAmount = async ({
  depositId,
  amount,
}: {
  depositId: number;
  amount: number;
}): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    console.log("updateDepositAmount");
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      // Fetch the deposit
      const { data: deposit, error: fetchError } = await supabase
        .from("deposits")
        .select("*")
        .eq("id", depositId)
        .single();

      if (fetchError) {
        console.error("Error fetching deposit", fetchError);
        return reject(fetchError);
      }

      if (!deposit) {
        return reject(new Error("Deposit not found"));
      }

      // Update the deposit amount
      const { error: updateError } = await supabase
        .from("deposits")
        .update({ amount })
        .eq("id", depositId);

      if (updateError) {
        console.error("Error updating deposit amount", updateError);
        return reject(updateError);
      }

      resolve("Deposit amount updated successfully");
    } catch (error) {
      console.error("Error updating deposit amount", error);
      reject(error);
    }
  });
};
