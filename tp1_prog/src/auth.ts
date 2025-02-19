import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "./prisma"
import { CheckPassword, HashPassword } from "./lib/password"
 
class InvalidLoginError extends CredentialsSignin {code = "Invalid identifier or password"}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {

        console.log(credentials)
       

        const user = await prisma.user.findUnique({
          where: { 
            email: (credentials.email as string) 
          }
        });
        
        if (!user || !CheckPassword((credentials.password as string), user.password)) {
          throw new Error("Identifiants incorrects !");
        } else {
          return { id: user.id, };
        }
      },
    }),
  ],
})