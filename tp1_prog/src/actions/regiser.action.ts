"use server";
import prisma from "@/prisma";
import { HashPassword } from "@/lib/password";
import { RegisterData, registrationSchema } from "@/schema";

export async function registerAction(data: RegisterData) {
console.log("TEST REGISTRATION ACTION")
  const result = registrationSchema.safeParse(data);
  console.log(result)
  const { email, password } = result.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { success: false, message: "L'authentification a échoué" };
  }

  const hashedPassword = await HashPassword(password);

  try {
    await prisma.user.create({
      data: { email, password: hashedPassword },
    });
  } catch (error) {
    return { success: false, message: "Une erreur est survenue" };
  }
}
