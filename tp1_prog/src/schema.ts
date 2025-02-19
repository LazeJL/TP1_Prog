import { z } from "zod";

export const registrationSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis." }),
  email: z.string().email({ message: "L'adresse email n'est pas valide." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
});

export type RegistrationSchema = z.infer<typeof registrationSchema>;
export type RegisterData = z.infer<typeof registrationSchema>;

export const loginSchema = z.object({
  email: z.string().email({ message: "L'adresse email n'est pas valide." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type LoginData = z.infer<typeof loginSchema>;
