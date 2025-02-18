"use client"
import { z } from "zod"
import { useForm, zodResolver } from '@mantine/form';
import Link from 'next/link';
import { useState } from "react";
import { Button, NoticeMessage, PasswordInput, TextInput } from "@arthur.eudeline/starbucks-tp-kit";


const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6)
})

export default function Page() {
    
    const handleErrors = (errors: typeof form.errors) => {
        setMessageToDisplay(<NoticeMessage type={"error"} onDismiss={() => setMessageToDisplay(null)} message="Une erreur s'est produite !"/>)
    }

    const handleSuccess = async (values: typeof form.values) => {
        setMessageToDisplay(<NoticeMessage type={"success"} onDismiss={() => setMessageToDisplay(null)} message="Votre inscription a bien été prise en compte. Validez votre adresse email pour vous connecter"/>)
    }

    const [messageToDisplay,setMessageToDisplay] = useState(null) as any

    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            password: ""
        }
    })


    return <>
        {messageToDisplay}
        <h1>Inscription</h1>
        <form onSubmit={form.onSubmit(handleSuccess,handleErrors)}>
            <TextInput label="Nom" placeholder='Entrez votre nom' required {...form.getInputProps("name")} />
            <TextInput label="Adresse email"  placeholder='lin.guini@barilla.it' required {...form.getInputProps("email")}/>
            <PasswordInput label="Mot de passe"  placeholder='Entrez votre mot de passe' {...form.getInputProps("password")}/>
            <Button fullWidth type={"submit"}>S'inscrire</Button>
            <Link href={"/connexion"}>Déjà un compte, Se connecter</Link>
        </form> 
    </>
    
}