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
