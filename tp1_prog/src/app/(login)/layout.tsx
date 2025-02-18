import { SectionContainer } from "@arthur.eudeline/starbucks-tp-kit";

export default function Layout({children}: {children: React.ReactNode}) {

    return <SectionContainer>
                <div>
                {children}
                </div>
            </SectionContainer>
}