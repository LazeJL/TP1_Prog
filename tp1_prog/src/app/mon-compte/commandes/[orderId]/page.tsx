import { NextPageProps } from "@/types";
import prisma from "@/prisma";
import { notFound } from "next/navigation";
import { OrderDetails } from "./order-details";
import { getCurrentUser } from "@/lib/get-current-user";

type Props = {
  orderId: string;
}

export default async function OrderDetailsPage({params}: NextPageProps<Props>) {

  const user = await getCurrentUser() 

  if(!user){
    throw new Error("Donnée Invalide !")
  }

  try{

    const orderId = parseInt(params.orderId);

    if(!orderId){
      throw new Error("Identifiant de commande invalide !")
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
        userId: user.id
      },
      include: {
        lines: {
          include: { product: true }
        }
      }
    });

    if (!order) notFound();

    return <OrderDetails order={order} />
    
  } catch {
    throw new Error("Une erreur est survenue !")
  }
}