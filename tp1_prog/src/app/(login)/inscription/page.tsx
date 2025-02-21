"use client"
import { useForm, zodResolver } from '@mantine/form';
import Link from 'next/link';
import { Button, PasswordInput, TextInput } from "@arthur.eudeline/starbucks-tp-kit";
import { registrationSchema } from "@/schema";
import { registerAction } from '@/actions/regiser.action';
import { toast } from 'sonner';
import { loginAction } from '@/actions/login.action';

export default function Page() {
    
    const handleErrors = () => {
        toast.error("Une erreur s'est produite !! ")
    }

    const handleSuccess = async (values: typeof form.values) => {
        const success = registerAction(values)
        if((await success).success){
          toast.success((await success).message)
          await loginAction(values)
        } else {
          toast.error((await success).message)
        }
    }

    const form = useForm({
        initialValues: {
            name: "Jordan",
            email: "Jordan@Lechat.fr",
            password: "Jordan"
        },
        validate: zodResolver(registrationSchema)
    })


    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ width: "500px" }}>
            <h1>INSCRIPTION</h1><br></br>
            <form onSubmit={form.onSubmit(handleSuccess, handleErrors)}>
              <TextInput label="Nom" placeholder="Entrez votre nom" required {...form.getInputProps("name")} /><br></br>
              <TextInput label="Adresse email" placeholder="lin.guini@barilla.it" required {...form.getInputProps("email")} /><br></br>
              <PasswordInput label="Mot de passe" placeholder="Entrez votre mot de passe" {...form.getInputProps("password")} /><br></br>
              <Button fullWidth type="submit">S'inscrire</Button><br></br><br></br>
              <Link href="/connexion" style={{display: "flex", justifyContent: "center", color: "green"}}>Déjà un compte ? Se connecter</Link>
            </form>
          </div>
        </div>
      );
      
    
}