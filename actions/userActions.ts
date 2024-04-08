import { supabase } from "@/lib/supabase";
import { UserQuery } from "@/types/userTypes";

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
