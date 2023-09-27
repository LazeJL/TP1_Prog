import { create } from 'zustand';
import {CartData, ProductLineData} from "../types";
import {ProductData} from "tp-kit/types";
import { count } from 'console';

export const useStore = create((set) => ({
    lines: [] as ProductLineData[],
    count: 0,
}))

/**
 * Ajoute une nouvelle ligne au panier.
 * Si le produit est déjà dans le panier, augmente la quantité de 1.
 *
 * @param product
 */
export function addLine(product: ProductData) {
    useStore.setState((state: CartData) => {
        const line = state.lines.find((l) => l.product.id === product.id)
        if (line) {
            line.qty++
            return {
                lines: state.lines.map((l) => {
                    if (l.product.id === product.id) {
                        return line
                    }
                    return l
                }),
            }
        }

        if(!line)
          useStore.setState({count : useStore.getState().count + 1})

        return {
            lines: [...state.lines, { product, qty: 1 }],
        }
    })
}

/**
 * Modifie une ligne produit du panier
 *
 * @param line
 */
export function updateLine(line: ProductLineData) {
    useStore.setState((state: CartData) => {
        return {
            lines: state.lines.map((l) => {
                if (l.product.id === line.product.id) {
                    return line
                }
                return l
            }),
        }
    })
}

/**
 * Supprime la ligne produit du panier
 *
 * @param productId
 * @returns
 */
export function removeLine(productId: number) {
  useStore.setState((state: CartData) => {
      const updatedLines = state.lines.filter((l) => l.product.id !== productId);
      if (useStore.getState().count > 0) {
          if (updatedLines.length < state.lines.length) {
              useStore.setState({ count: useStore.getState().count - 1 });
          }
      }

      return {
          lines: updatedLines,
      };
  });
}

/**
 * Vide le contenu du panier actuel
 */
export function clearCart() {
    useStore.setState({ lines: [] })
}

/**
 * Calcule le total d'une ligne du panier
 */
export function computeLineSubTotal(line: ProductLineData): number {
    return line.product.price * line.qty
}

/**
 * Calcule le total du panier
 */
export function computeCartTotal(lines: ProductLineData[]): number {
    return lines.reduce((acc, line) => acc + computeLineSubTotal(line), 0)
}