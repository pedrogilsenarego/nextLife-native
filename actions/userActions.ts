import { supabase } from "@/lib/supabase";

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
