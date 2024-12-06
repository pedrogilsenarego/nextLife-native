import { supabase } from "@/lib/supabase";
import { CarsQuery } from "@/types/carsTypes";

export const getCars = async (): Promise<CarsQuery> => {
  console.log("getingCars");
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { data: deposits, error: depositsError } = await supabase
        .from("cars")
        .select("*")
        .eq("user_id", user.id);

      if (depositsError) {
        console.error("error", depositsError);
        return reject(depositsError);
      }

      const formattedWatches: CarsQuery = deposits.map((deposit: any) => ({
        userId: deposit.user_id,
        brand: deposit.brand,
        id: deposit.id,
        model: deposit.model,
        createdAt: deposit.created_at,
        value: deposit.value,
        licenseDate: deposit.license_date,
        cc: deposit.cc,
        typeFuel: deposit.type_fuel,
        co2: deposit.co2,
      }));

      resolve(formattedWatches || []);
    } catch (error) {
      console.error("error", error);
      reject(error);
    }
  });
};
