"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { computeCartTotal, computeLineSubtotal } from "../hooks/use-cart";
import { CartData } from "../types";
import prisma from "../utils/prisma";
import { cookies } from "next/headers";
import { getUser } from "../utils/supabase";

export interface createOrderResponse {
  error: string | null,
  success: boolean
}

export async function createOrder(cart: CartData): Promise<createOrderResponse> {
  const supabase = createServerComponentClient({cookies})
  const currentUser = await getUser(supabase)
  if(!currentUser)
    return {error: "vous ne pouvez pas passer de commande si vous êtes déconnecté", success: false}
  console.log(currentUser);
  console.log(await prisma.order.create({
    data: {
      total: computeCartTotal(cart.lines),
      userId: currentUser.id,
      lines: {
        create: cart.lines.map(line => ({
          productId: line.product.id,
          qty: line.qty,
          subtotal: computeLineSubtotal(line),
        }))
      },
    }
  }));
  return {error: null, success: true}
}