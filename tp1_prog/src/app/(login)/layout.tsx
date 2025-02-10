"use client"
import { ReactNode, useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import { SectionContainer } from "@arthur.eudeline/starbucks-tp-kit";
import { getUser } from "@/utils/supabse";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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