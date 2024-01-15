"use client"
import { z } from "zod"
import { TextInput, PasswordInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import Link from 'next/link';
import { Button, useZodI18n } from 'tp-kit/components';
import Layout from '../layout';
import { useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter()
    const supabase = createClientComponentClient()
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })
    useZodI18n(z)
    const form = useForm({
        initialValues: {
            email: "",
            password: ""
        },
        validate: zodResolver(schema)
    })

    const handleSignin = (async (values: typeof form.values) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password
        })
        console.log(error);
        
        router.refresh()
    })

    return <div> 
        <h1>Connection</h1>
        <form onSubmit={form.onSubmit(handleSignin)}>
            <TextInput label="Adresse email" withAsterisk placeholder='lin.guini@barilla.it' required {...form.getInputProps("email")}/>
            <PasswordInput label="Mot de passe" withAsterisk placeholder='Entrez votre mot de passe' required {...form.getInputProps("password")}/>
            <Button fullWidth type={"submit"}>Se connecter</Button>
            <Link href={"/inscription"}>Créer un compte</Link>
        </form> 
    </div>
}