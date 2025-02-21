import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "./prisma"
import { CheckPassword} from "./lib/password"
import { loginSchema } from "./schema"
 


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(data) {

        const result = loginSchema.safeParse(data);

        if(result.error){
          throw new Error("Donnée invalide")
        }

        const credentials = result.data
       
        const user = await prisma.user.findUnique({
          where: { 
            email: credentials.email
          }
        });

        if (!user) {
          throw new Error("Le compte n'existe pas");
        } 
        if(!CheckPassword(credentials.password, user.password)){
          throw new Error("Identifiant invalide");
        }
        return { email: user.email };  
      },
    }),
  ],
})