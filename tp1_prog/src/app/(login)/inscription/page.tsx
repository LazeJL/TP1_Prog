'use client';

import {useForm} from "@mantine/form";
import {Card, PasswordInput, TextInput} from "@mantine/core";
import {Button} from "tp-kit/components";
import {useRouter} from "next/navigation";

export default function Inscription(){
    const form = useForm({
        initialValues: {
            nom: '',
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const router = useRouter();

    const handleSubmit = (values) => {
        console.log(values);
    }

    return (
      <Card maw={340} mx="auto">
        <form
            className="flex items-center flex-col space-y-6 w-"
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
        >
            <p
                className="text-left w-full"
            >
                Inscription
            </p>

            <TextInput
                className="w-full"
                required
                label="Nom"
                description="Le nom qui sera utilisé pour vos commandes"
                {...form.getInputProps('nom')}
            />

            <TextInput
                className="w-full"
                required
                label="Adresse email"
                {...form.getInputProps('email')}
            />

            <PasswordInput
                className="w-full"
                required
                label="Mot de passe"
                {...form.getInputProps('password')}
            />

            <Button
                className="w-full"
                type="submit"
            >
                S'inscrire
            </Button>

            <a onClick={() => router.push('/connexion')} className="">Déjà un compte ? Se connecter</a>
        </form>
        </Card>
    );
}