import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "./prisma"
import { CheckPassword } from "./lib/password"
 
class InvalidLoginError extends CredentialsSignin {code = "Invalid identifier or password"}

export const { signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        mail: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        console.log(credentials)

        const user = await prisma.user.findUnique({
          where: { email: (credentials.mail as string) }
        });

        if (!user || !CheckPassword((credentials.password as string), user.password)) {
          throw new Error("Identifiants incorrects !");
        }

        return { id: user.id };
      },
    }),
  ],
})