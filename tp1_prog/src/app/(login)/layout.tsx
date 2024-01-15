"use client"
import { ReactNode, useEffect, useReducer } from "react";
import { Card, SectionContainer, ZodI18nProvider } from "tp-kit/components";
import { getUser } from "../../utils/supabase";
import { createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Layout({children}: {children: React.ReactNode}) {
    const supabase = createClientComponentClient()
    const router = useRouter()
    useEffect(() => {
        getUser(supabase).then((data) => {
            console.log(data);
            if(data)
                router.replace('/')
        })
    }, [])
    return <SectionContainer>
                <ZodI18nProvider>
                    {children}
                </ZodI18nProvider>
            </SectionContainer>
           

}