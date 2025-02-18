import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "./prisma"
import { CheckPassword } from "./lib/password"
 
class InvalidLoginError extends CredentialsSignin {code = "Invalid identifier or password"}

export const { signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(req)
        const user = await prisma.user.findUnique({
          where : {
            email: ""
          }
        });

        if(user){
          const password = credentials.password
          if(!CheckPassword((password as string), user.password)){
            throw new Error("Password is incorrect !")
          } else {
            return await getUser(user.id)
          }
        } else {
          throw new Error("User doesn't exist !")
          return null
        }
      },
    }),
  ],
})