"use client"
import { useForm, zodResolver } from '@mantine/form';
import Link from 'next/link';
import { useState } from "react";
import { Button, NoticeMessage, PasswordInput, TextInput } from "@arthur.eudeline/starbucks-tp-kit";
import { registrationSchema } from "@/schema";
import { registerAction } from '@/actions/regiser.action';

export default function Page() {
    
    const handleErrors = (errors: typeof form.errors) => {
        setMessageToDisplay(<NoticeMessage type={"error"} onDismiss={() => setMessageToDisplay(null)} message="Une erreur s'est produite !"/>)
    }

    const handleSuccess = async (values: typeof form.values) => {
        const success = registerAction(values)
        if((await success).success){
          setMessageToDisplay(<NoticeMessage type={"success"} onDismiss={() => setMessageToDisplay(null)} message="Votre inscription a bien été prise en compte."/>)
        } else {
          setMessageToDisplay(<NoticeMessage type={"error"} onDismiss={() => setMessageToDisplay(null)} message="Cette adresse email est déjà utilisé."/>)
        }
    }

    const [messageToDisplay,setMessageToDisplay] = useState(null) as any

    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validate: zodResolver(registrationSchema)
    })


    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ width: "500px" }}>
            {messageToDisplay}
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