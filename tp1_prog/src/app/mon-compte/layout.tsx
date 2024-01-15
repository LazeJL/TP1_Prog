"use client"
import { ReactNode, useCallback, useEffect, useReducer, useState } from "react";
import { Button, Card, SectionContainer } from "tp-kit/components";
import prisma from "../../utils/prisma";
import { OrderTable } from "../../components/order-table";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { getUser, signOutUser } from "../../utils/supabase";
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { getOrders } from "../../actions/get-orders";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter()
  //const orders = await prisma.order.findMany();
  const supabase = createClientComponentClient();
  const [user, setUser]: any = useState(null)
  const [orders, setOrders] = useState([])
  const handleSignout = useCallback(() => {
    signOutUser(supabase)
    router.refresh()
  }, [])

  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data as any)
    })
    
    getUser(supabase).then((data) => {
      if(!data)
        router.replace("/connexion")
      setUser(data as any)
    })
  }, [orders])

  return (
    <>
    <SectionContainer>
      <Card>
        <h1><b>Mon compte</b></h1>
        <h2>Bonjour,{user?.user_metadata.first_name}</h2>
        <h2><b>Nom: </b>{user?.user_metadata.first_name}</h2>
        <h2><b>Email: </b>{user?.email}</h2>
        <Button onClick={handleSignout}>Se déconnecter</Button>
      </Card>
     
    </SectionContainer>
      {/* Orders list */}
      <SectionContainer wrapperClassName="py-24 min-h-[80vh]">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <OrderTable orders={orders} />
        </div>
      </SectionContainer>

      {/* Children */}
      {children}
    </>
  );
}
