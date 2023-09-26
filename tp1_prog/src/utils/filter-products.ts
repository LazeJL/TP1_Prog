import { ProductsCategoryData } from "tp-kit/types";
import { ProductFilterResult } from "@/types";

export function filterProducts(
	categories: ProductsCategoryData[], 
	filters?: ProductFilterResult
) : ProductsCategoryData[] {
  if (!filters) return categories

  const filteredResult : ProductsCategoryData[] = []

  if (filters.categoriesSlug.length > 0) {

    categories.map(category => {
      if (filters.categoriesSlug.includes(category.slug)) {

        let output = {...category}

        if (filters.search) {
          const pattern : string = filters.search
          output.products = output.products.filter(product => {
            return product.name.toLowerCase().includes(pattern.toLowerCase())
          })
        }

        filteredResult.push(output)

      }
    })

  } else {

    categories.map(category => {

      let output = {...category}

      if (filters.search) {
        const pattern : string = filters.search
        output.products = output.products.filter(product => {
          return product.name.toLowerCase().includes(pattern.toLowerCase())
        })
      }
      
      filteredResult.push(output)

    })

  }
  return filteredResult
};