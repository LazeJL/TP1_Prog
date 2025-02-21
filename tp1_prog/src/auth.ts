import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "./prisma"
import { CheckPassword, HashPassword} from "./lib/password"
import { toast } from "sonner"
 
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

        console.log(user);

        console.log("Mot de passe en clair:", credentials.password);
        console.log("Mot de passe haché en DB:", HashPassword((credentials.password as string)));
        
        if (!user || !CheckPassword((credentials.password as string), user.password)) {
          console.log("Error")
          throw new InvalidLoginError();
        } else {
          return { id: user.id, };  
        }
      },
    }),
  ],
})