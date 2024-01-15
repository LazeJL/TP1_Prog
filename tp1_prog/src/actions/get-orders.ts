"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import prisma from "../utils/prisma";
import { cookies } from "next/headers";
import { getUser } from "../utils/supabase";

export async function getOrders() {
    const supabase = createServerActionClient({cookies})
    const currentUser = await getUser(supabase)
    return await prisma.order.findMany({
        where: {
            userId: {
                equals: currentUser?.id
            }
        }
    });
}