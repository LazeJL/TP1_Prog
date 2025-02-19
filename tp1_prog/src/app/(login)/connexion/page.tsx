"use client"
import { useForm, zodResolver } from '@mantine/form';
import Link from 'next/link';
import { Button, PasswordInput, TextInput } from "@arthur.eudeline/starbucks-tp-kit";
import { loginSchema} from "@/schema";
import { loginAction } from "@/actions/login.action";

export default function Page() {

    const form = useForm({
        initialValues: {
            email: "Jordan@Lechat.fr",
            password: "Jordan"
        },
        validate: zodResolver(loginSchema)
    })

    const handleSignin = async (values: typeof form.values) => {
        const success = await loginAction(values)
        console.log(success)
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "500px" }}>
                <h1>CONNEXION</h1><br></br>
                <form onSubmit={form.onSubmit(handleSignin)}>
                    <TextInput label="Adresse email" placeholder='lin.guini@barilla.it' required {...form.getInputProps("email")}/><br></br>
                    <PasswordInput label="Mot de passe" placeholder='Entrez votre mot de passe' required {...form.getInputProps("password")}/><br></br>
                    <Button fullWidth type={"submit"}>Se connecter</Button><br></br><br></br>
                    <Link href="/inscription" style={{display: "flex", justifyContent: "center", color: "green"}}>Créer un compte</Link>
                </form> 
            </div>
        </div>

    );
        
        
    
}