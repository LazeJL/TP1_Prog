import { ReactNode } from "react";
import { Card } from "@arthur.eudeline/starbucks-tp-kit/components/card";
import { SectionContainer } from "@arthur.eudeline/starbucks-tp-kit/components/section-container";
import prisma from "@/prisma";
import { OrderTable } from "@/components/order-table";
import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";
import { logoutAction } from "@/actions/logout.action";
import { LogoutButton } from "./LogoutButton";
import { SessionProvider } from "next-auth/react";

export default async function Layout({ children }: { children: ReactNode }) {

  const user = await getCurrentUser()

  if(!user){
    redirect('/connexion');
  }
  
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <>
    <SessionProvider>
      {/* Orders list */}
      <SectionContainer wrapperClassName="py-24 min-h-[80vh] flex flex-col lg:flex-row items-stretch gap-6">
        {/* User Details */}
        <Card className="w-full lg:w-1/4 p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">MON COMPTE</h2>
          <div>
            <p><strong>Nom :</strong> {user.name}</p>
            <p><strong>Email :</strong> {user?.email}</p>
          </div>
          <LogoutButton />
        </Card>
        
        {/* Orders Table */}
        <Card className="flex-1">
          <OrderTable orders={orders} />
        </Card>
      </SectionContainer>
  
      {/* Children - order details modal */}
      {children}
      </SessionProvider>
    </>
  );
  
}
