import React from "react";
import { removeLine, updateLine, useStore } from "@/hooks/use-cart";
import { ProductCartLine } from "tp-kit/components";

export default function Cart() {
  const cartItems = useStore((state) => state.lines);

  return (
    <div>
      {cartItems.map((line) => (
        <ProductCartLine
          className={"mb-4"}
          key={line.product.id}
          product={line.product}
          qty={line.qty}
          onDelete={() => {
            removeLine(line.product.id);
          }}
          onQtyChange={(qty) => {
            if (qty === 0) {
              removeLine(line.product.id);
            } else {
              updateLine({ product: line.product, qty: qty });
            }
          }}
        />
      ))}
    </div>
  );
}
