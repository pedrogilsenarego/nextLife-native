import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://snzyaubnceyckkzdrmkg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuenlhdWJuY2V5Y2tremRybWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0NzY2ODYsImV4cCI6MjAyMjA1MjY4Nn0.FwUUDcU7o0T-pV1-c8_hdiPS5EDirinwMMRQCMWTcWE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
