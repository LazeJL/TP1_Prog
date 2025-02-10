"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { ReactNode, useEffect } from "react"

export default function RealTimeOrderDetails({children}: {children: ReactNode}) {
    const supabase = createClientComponentClient()
    useEffect(() => {
        const channel = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                {
                event: 'UPDATE',
                schema: 'public',
                },
                (payload) => console.log(payload)
            ).subscribe()
    },[supabase])

    return <>{children}</>
}