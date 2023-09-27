import { ProductLineData } from "@/types";
import { ProductData } from "../../tp-kit/types";

// Déclarez une variable pour stocker le panier, par exemple :
let cart: ProductLineData[] = [];

/**
 * Ajoute une nouvelle ligne au panier.
 * Si le produit est déjà dans le panier, augmente la quantité de 1.
 * 
 * @param product 
 */
 export function addLine(product: ProductData) {
    const existingLine = cart.find((line) => line.product === product);
    console.log(cart)
  
    if (existingLine) {
      existingLine.qty += 1;
    } else {
      cart.push({ product, qty: 1 });
      console.log(cart)
    }
  }
  
  

/**
 * Modifie une ligne produit du panier
 * 
 * @param line 
 */
export function updateLine(line: ProductLineData) {
  const existingLineIndex = cart.findIndex((l) => l.product === line.product);

  if (existingLineIndex !== -1) {
    cart[existingLineIndex] = line;
  }
}

/**
 * Supprime la ligne produit du panier 
 * 
 * @param productId 
 * @returns 
 */
 export function removeLine(productId: number) {
    cart = cart.filter((line) => line.product.id !== productId);
  }
  
  

/**
 * Vide le contenu du panier actuel
 */
export function clearCart() {
  cart = [];
}

/**
 * Calcule le total d'une ligne du panier
 */
export function computeLineSubTotal(line: ProductLineData): number {
  return line.product.price * line.qty;
}

/**
 * Calcule le total du panier
 */
export function computeCartTotal(lines: ProductLineData[]): number {
  return lines.reduce((total, line) => total + computeLineSubTotal(line), 0);
}
