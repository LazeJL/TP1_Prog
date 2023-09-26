import { NextFont } from "next/dist/compiled/@next/font"
import { ReactNode } from "react"
import { MantineCustomThemeProvider } from "tp-kit/components"

type Props = {font : NextFont, children : ReactNode}

export default function Providers({font, children}: Props) {
    return (
        <MantineCustomThemeProvider font={font}>
            {children}
        </MantineCustomThemeProvider>
    )
}