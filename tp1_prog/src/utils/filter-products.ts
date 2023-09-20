import { ProductsCategoryData } from "tp-kit/types";
import { ProductFilterResult } from "@/ProductFilterResult";

 

export function filterProducts(
  categories: ProductsCategoryData[],
  filters?: ProductFilterResult
): ProductsCategoryData[] {
  if (!filters) {
    return categories;
  }
  const filteredCategories = categories.map((category) => {
    return category;
  });

 

  return filteredCategories;
}