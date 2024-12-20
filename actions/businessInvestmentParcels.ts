import { supabase } from "@/lib/supabase";
import { BusinessInvestmentParcelsQuery } from "@/types/businessInvestmentParcels";
import { BusinessQuery } from "@/types/businessTypes";

export const getBusinessInvestmentParcels = async ({
  businessId,
}: {
  businessId: string;
}): Promise<BusinessInvestmentParcelsQuery> => {
  console.log("getingBusinessInvestmentParcels", businessId, new Date());
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { data: businesses, error: businessesError } = await supabase
        .from("business_investment_parcels")
        .select("*")
        .eq("business_id", businessId);

      if (businessesError) {
        console.error("error", businessesError);
        return reject(businessesError);
      }

      const formattedBusinesses: BusinessInvestmentParcelsQuery =
        businesses.map((business: any) => ({
          id: business.id,
          businessId: business.business_id,
          amount: business.amount,
          description: business.description,
          createdAt: business.created_at,
        }));

      resolve(formattedBusinesses || []);
    } catch (error) {
      console.error("error", error);
      reject(error);
    }
  });
};
