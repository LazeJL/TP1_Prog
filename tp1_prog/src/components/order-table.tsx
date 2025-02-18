"use client";

import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { OrderTableLayout } from "@arthur.eudeline/starbucks-tp-kit/components/orders/order-table-layout";
import type { OrderTableRowData } from "@arthur.eudeline/starbucks-tp-kit/types";

type Props = {
  orders: OrderTableRowData[];
};

export const OrderTable: FC<Props> = function ({ orders }) {
  const router = useRouter();

  const handleRowClick = useCallback(
    (order: OrderTableRowData) => {
      router.push(`/mon-compte/commandes/${order.id}`,{scroll: false});
    },
    [router],
  );

  return <OrderTableLayout orders={orders} onRowClick={handleRowClick} />;
};
