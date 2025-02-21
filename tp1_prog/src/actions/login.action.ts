"use server";

import { signIn } from "@/auth";
import { LoginData, loginSchema } from "@/schema";
import { redirect } from "next/navigation";

export async function loginAction(data: LoginData) {
  const result = loginSchema.safeParse(data);
  await signIn("credentials",{ email : result.data?.email, password : result.data?.password, redirect: false})
  redirect("/mon-compte")
}
  