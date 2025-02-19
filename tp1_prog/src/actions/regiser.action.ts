"use server";
import prisma from "@/prisma";
import { HashPassword } from "@/lib/password";
import { RegisterData, registrationSchema } from "@/schema";

export async function registerAction(data: RegisterData) {
  const result = registrationSchema.safeParse(data);
  
  const email = (result.data?.email as string)
  const password = result.data?.password

  const existingUser = await prisma.user.findUnique({ where: { email: email } });

  if (existingUser) {
    return { success: false, message: "L'authentification a échoué" };
  }

  const hashedPassword = HashPassword((password as string));

  try {
    await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    return { success: true, message: "Le compte a été crée" }
  } catch (error) {
    return { success: false, message: "Une erreur est survenue" };
  }
  
}
