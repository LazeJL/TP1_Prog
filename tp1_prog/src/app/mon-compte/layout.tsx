import { ReactNode } from "react";
import { Card } from "@arthur.eudeline/starbucks-tp-kit/components/card";
import { SectionContainer } from "@arthur.eudeline/starbucks-tp-kit/components/section-container";
import prisma from "@/prisma";
import { OrderTable } from "@/components/order-table";

export default async function Layout({ children }: { children: ReactNode }) {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <>
      {/* Orders list */}
      <SectionContainer wrapperClassName="py-24 min-h-[80vh] flex flex-col lg:flex-row items-stretch gap-6">
        <Card className="flex-1">
          <OrderTable orders={orders} />
        </Card>
      </SectionContainer>

      {/* Children - order details modale */}
      {children}
    </>
  );
}
