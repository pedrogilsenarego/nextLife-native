import { supabase } from "@/lib/supabase";
import { BusinessQuery } from "@/types/businessTypes";

export const getBusinesses = async (): Promise<BusinessQuery> => {
  console.log("getingBusinesses");
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { data: businesses, error: businessesError } = await supabase
        .from("business")
        .select("*")
        .eq("user_id", user.id);

      if (businessesError) {
        console.error("error", businessesError);
        return reject(businessesError);
      }

      const formattedBusinesses: BusinessQuery = businesses.map(
        (business: any) => ({
          user_id: business.user_id,
          type: business.type,
          id: business.id,
          created_at: business.created_at,
          settings: business.settings,
          businessName: business.business_name, // Mapping business_name to businessName
          // Add other fields as needed
        })
      );

      resolve(formattedBusinesses || []);
    } catch (error) {
      console.error("error", error);
      reject(error);
    }
  });
};

export const addBusiness = async ({
  businessName,
  type,
}: {
  businessName: string;
  type: number;
}): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    console.log("addBusiness", businessName);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { error: userError } = await supabase.from("business").upsert([
        {
          business_name: businessName,
          type,
          user_id: user.id,
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
