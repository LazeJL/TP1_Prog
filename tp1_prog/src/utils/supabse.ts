import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function getUser(client: SupabaseClient){
    return (await client.auth.getUser()).data.user
}

export async function signOutUser(client: SupabaseClient) {
    client.auth.signOut()
}