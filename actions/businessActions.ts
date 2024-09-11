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
          iconType: business.icon_type,
          created_at: business.created_at,
          settings: business.settings,
          businessName: business.business_name,
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

export const updateBusinessIconType = async ({
  businessId,
  iconType,
}: {
  businessId: string;
  iconType: number;
}): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    console.log("updateBusinessIconType", businessId, iconType);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { error: updateError } = await supabase
        .from("business")
        .update({ icon_type: iconType })
        .eq("id", businessId)
        .eq("user_id", user.id);

      if (updateError) {
        console.error("updateError", updateError);
        return reject(updateError);
      }

      resolve("Success");
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const deleteBusiness = async (businessId: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    console.log("Deleting business with ID:", businessId);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { error: deleteError } = await supabase
        .from("business")
        .delete()
        .eq("id", businessId)
        .eq("user_id", user.id);

      if (deleteError) {
        console.error("Error deleting business:", deleteError);
        return reject(deleteError.message);
      }

      resolve("Business deleted successfully");
    } catch (error) {
      console.error("Error deleting business:", error);
      reject(error);
    }
  });
};
