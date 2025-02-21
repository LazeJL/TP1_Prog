"use server";
import prisma from "@/prisma";
import { HashPassword } from "@/lib/password";
import { RegisterData, registrationSchema } from "@/schema";

export async function registerAction(data: RegisterData) {
  const result = registrationSchema.safeParse(data);

  if(result.error){
    console.error(result.error.flatten())
    throw new Error("Donnée Invalide !")
  }
  
  const email = result.data.email
  const password = result.data.password
  const name = result.data.name

  const existingUser = await prisma.user.findUnique({ where: { email: email } });

  if (existingUser) {
    return { success: false, message: "L'inscription a échoué" };
  }

  const hashedPassword = HashPassword(password);

  try {
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return { success: true, message: "Votre inscription a bien été prise en compte." }
  } catch (error) {
    return { success: false, message: "Une erreur est survenue" };
  }
  
}
