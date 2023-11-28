"use client";
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {Button, NoticeMessage, NoticeMessageData, SectionContainer} from "tp-kit/components";
import {z} from 'zod';
import {useForm, zodResolver} from '@mantine/form';
import {PasswordInput, TextInput, Box, Group} from '@mantine/core';
import React, {useState} from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const schema = z.object({
    name: z.string().min(2, {message: 'Le nom ne doit pas être vide'}),
    email: z.string().email({message: 'Format invalide'}),
    password: z.string().min(6, {message: 'Le mot de passe doit contenir au moins 6 caractères'}),
});

const Inscription = () => {
    const [notices, setNotices] = useState<NoticeMessageData[]>([]);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const supabase = createClientComponentClient()
    function addError() {
        setNotices(n => [...n, {type: "error", message: "Erreur d'inscription"}]);
    }
    function addSuccess() {
        setNotices(n => [...n, {type: "success", message: "Inscription réussi"}]);
    }
    function removeNotice(index) {
        setNotices(n => {
            delete (n[index]);
            return Object.values(n);
        });
    }
    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
    });
    const handleSignUp = async () => {
        await supabase.auth.signUp({
            email: form.values.email,
            password : form.values.password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })
        //router.refresh()
    }
    return (
            <Box maw={340} mx="auto">
                <ul>
                    {notices.map((notice, i) => <NoticeMessage
                        key={i}
                        {...notice}
                        onDismiss={() => removeNotice(i)}
                    />)}
                </ul>
                <form  onSubmit={form.onSubmit(handleSignUp)} className="space-y-8 mt-16">
                    <TextInput
                        withAsterisk
                        label="Name"
                        description="Le nom qui sera utilisé pour vos commandes"
                        placeholder="Michel"
                        mt="sm"
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="example@mail.com"
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        withAsterisk
                        label="Password"
                        placeholder={"Ke$$a..."}
                        {...form.getInputProps('password')}
                    />
                    <div>
                        <Button type="submit" fullWidth onClick={addError}>
                            S'inscrire
                        </Button>
                        <Button variant={"outline"} fullWidth variant="ghost"
                                onClick={() => {
                                    window.location.href = "/connexion"
                                }}>
                            Déjà un compte ? Se connecter
                        </Button>
                    </div>
                </form>
            </Box>
    );
}
export default Inscription;