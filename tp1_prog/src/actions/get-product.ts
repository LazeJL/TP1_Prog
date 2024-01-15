"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import prisma from "../utils/prisma";
import { cookies } from "next/headers";
import { getUser } from "../utils/supabase";

export async function getProduct(slug: string) {
    const supabase = createServerActionClient({cookies})
    const product = await prisma.product.findUnique({
        where: {slug},
        include: {
            category: {
                include: {
                    products: {
                    where: { slug: {not: slug}}
                    }
                }
            }
        }
    })
    return product
}