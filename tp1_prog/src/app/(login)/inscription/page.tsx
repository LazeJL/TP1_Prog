"use client"
import { z } from "zod"
import { TextInput, PasswordInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import Link from 'next/link';
import { Button, NoticeMessage, NoticeMessageData, useZodI18n } from 'tp-kit/components';
import Layout from '../layout';
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6)
})



export default function Page() {
    const supabase = createClientComponentClient();
    const handleErrors = (errors: typeof form.errors) => {
       /* setSubmissionError(true)
        setSubmissionSuccess(false)*/
        setMessageToDisplay(<NoticeMessage type={"error"} onDismiss={() => setMessageToDisplay(null)} message="Une erreur s'est produite !"/>)
    }

    const handleSuccess = async (values: typeof form.values) => {
        /*setSubmissionError(false)
        setSubmissionSuccess(true)*/
        setMessageToDisplay(<NoticeMessage type={"success"} onDismiss={() => setMessageToDisplay(null)} message="Votre inscription a bien été prise en compte. Validez votre adresse email pour vous connecter"/>)
        const res = await supabase.auth.signUp(
            {
              email: values.email,
              password: values.password,
              options: {
                data: {
                  first_name: values.name,
                },
                emailRedirectTo: 'http://localhost:3000/api/auth/callback'
              }
            }
        )
        console.log(res);
        
    }

    const [submitionSuccess, setSubmissionSuccess] = useState(false)
    const [submitionError, setSubmissionError] = useState(false)
    const [messageToDisplay,setMessageToDisplay] = useState(null) as any
    useZodI18n(z)
    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validate: zodResolver(schema),
    })
    return <>
        {messageToDisplay}
        <h1>Inscription</h1>
        <form onSubmit={form.onSubmit(handleSuccess,handleErrors)}>
            <TextInput label="Nom" withAsterisk description="Le nom qui sera utilisé pour vos commandes" placeholder='Entrez votre nom' required {...form.getInputProps("name")} />
            <TextInput label="Adresse email" withAsterisk placeholder='lin.guini@barilla.it' required {...form.getInputProps("email")}/>
            <PasswordInput label="Mot de passe" withAsterisk placeholder='Entrez votre mot de passe' {...form.getInputProps("password")}/>
            <Button fullWidth type={"submit"}>S'inscrire</Button>
            <Link href={"/connexion"}>Déjà un compte, Se connecter</Link>
        </form> 
    </>
    
}