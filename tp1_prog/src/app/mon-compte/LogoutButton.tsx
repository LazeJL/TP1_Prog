"use client"; 

import { Button } from "@arthur.eudeline/starbucks-tp-kit";
import { logoutAction } from "@/actions/logout.action";
import { useTransition } from "react";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  return (
    <Button 
      onClick={handleLogout} 
      disabled={isPending}
      className="mt-4 bg-red-500 text-white"
    >
      {isPending ? "Déconnexion..." : "Se déconnecter"}
    </Button>
  );
}
