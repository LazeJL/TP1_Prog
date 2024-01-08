import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
 
export const getUser = async (supabase: SupabaseClient) => {
    const { data, error } = await supabase.auth.getSession()
    return data
}