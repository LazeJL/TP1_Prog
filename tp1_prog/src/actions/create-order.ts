"use server";

import { computeCartTotal, computeLineSubtotal } from "@/hooks/use-cart";
import { CartData } from "@/types";
import prisma from "@/prisma";
import { revalidatePath } from "node_modules/next/cache";
import { getCurrentUser } from "@/lib/get-current-user";

export async function createOrder(cart: CartData) {

  //const user = await getCurrentUser();
  //console.log("CREATE ORDER USER :")

  //try {

    const user = await getCurrentUser();
    console.log("CREATE ORDER USER :",user?.id)

    if (!user) {
      return { error: "Vous devez être connecté pour passer une commande.", success: false };
    }

    await prisma.order.create({
      data: {
        total: computeCartTotal(cart.lines),
        lines: {
          create: cart.lines.map((line) => ({
            userId: user.id,
            productId: line.product.id,
            qty: line.qty,
            subtotal: computeLineSubtotal(line),
          })),
        },
      },
    });

    revalidatePath("/mon-compte");

    return { error: null, success: true };

  //} catch (error) {
  //  return { error: "Une erreur est survenue lors de la création de la commande.", success: false };
  //}
}
