"use client"
import { z } from "zod"
import { useForm, zodResolver } from '@mantine/form';
import Link from 'next/link';

export default function Page() {

    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const form = useForm({
        initialValues: {
            email: "",
            password: ""
        },
        validate: zodResolver(schema)
    })

    const handleSignin = (async (values: typeof form.values) => {
        
    })

    return <div> 
        <h1>Connection</h1>
        <form onSubmit={form.onSubmit(handleSignin)}>
            <TextInput label="Adresse email" placeholder='lin.guini@barilla.it' required {...form.getInputProps("email")}/>
            <PasswordInput label="Mot de passe" placeholder='Entrez votre mot de passe' required {...form.getInputProps("password")}/>
            <Button fullWidth type={"submit"}>Se connecter</Button>
            <Link href={"/inscription"}>Créer un compte</Link>
        </form> 
    </div>
}