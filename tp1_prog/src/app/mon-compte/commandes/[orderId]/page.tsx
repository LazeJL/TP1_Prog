import { NextPageProps } from "@/types";
import prisma from "@/prisma";
import { notFound } from "next/navigation";
import { OrderDetails } from "./order-details";

type Props = {
  orderId: string;
}

export default async function OrderDetailsPage({params}: NextPageProps<Props>) {
  const orderId = parseInt(params.orderId);
  const order = await prisma.order.findUnique({
    where: {id: orderId },
    include: {
      lines: {
        include: { product: true }
      }
    }
  });

  if (!order) notFound();

  return <OrderDetails order={order} />
}