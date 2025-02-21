"use server";

import { signIn } from "@/auth";
import { LoginData, loginSchema } from "@/schema";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

export async function loginAction(data: LoginData) {
  const result = loginSchema.safeParse(data);
  console.log(result.error)
  if(await signIn("credentials",{ email : result.data?.email, password : result.data?.password, redirect:false })){
    revalidatePath('/mon-compte');
  } else {
    toast.error("Une erreur s'est produite !")
  }
  
}
  