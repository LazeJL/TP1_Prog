import { getCurrentUser } from "@/lib/get-current-user";
import { SectionContainer } from "@arthur.eudeline/starbucks-tp-kit";
import { revalidatePath } from "next/cache";

export default function Layout({children}: {children: React.ReactNode}) {

    const user = getCurrentUser()
    if(user != null){
        revalidatePath('/mon-compte');
    }

    return <SectionContainer>
                <div>
                {children}
                </div>
            </SectionContainer>
}