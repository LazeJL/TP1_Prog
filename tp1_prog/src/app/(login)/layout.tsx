"use client"
import { ReactNode, useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import { SectionContainer } from "@arthur.eudeline/starbucks-tp-kit";

export default function Layout({children}: {children: React.ReactNode}) {

    return <SectionContainer>
                {children}
            </SectionContainer>
}