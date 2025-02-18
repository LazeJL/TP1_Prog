"use client";

import { type FC, useEffect, useMemo, useState } from "react";
import { ProductFiltersResult } from "@/types";
import { ProductFilters } from "./product-filters";
import { ProductGrid } from "./product-grid";
import { ProductsCategoryData } from "@arthur.eudeline/starbucks-tp-kit/types";
import { filterProducts } from "@/lib/filter-products";

type Props = {
  categories: ProductsCategoryData[]
}

export const ProductGridWithFilters: FC<Props> = function ({ categories }) {
  // Stoque la valeur des filtres du formulaire
  const [filters, setFilters] = useState<ProductFiltersResult | undefined>();
  const [filteredCategories, setFilteredCategories] = useState<ProductsCategoryData[]>(categories);
  const [isLoading, setLoading] = useState<boolean>(false);

  /**
   * Triggered on each filters change
   */
  useEffect(() => {
    // If no filters, just set initial categories
    if (!filters) {
      setFilteredCategories(categories);
      return;
    }

    setLoading(true);

    // Build URL query
    const query = new URLSearchParams();
    if (filters?.search) query.set('search', filters.search);
    filters?.categoriesSlugs.forEach(slug => query.append('cat', slug));

    // Call the filter API and applies the result
    fetch(`/api/product-filters?${query}`)
      .then(res => res.json())
      .then(res => {
        setFilteredCategories(res.categories);
        setLoading(false);
      });
  }, [filters, categories]);

  return <div className="flex gap-8">
    {/* Filtres */}
    <ProductFilters
      className="max-w-xs w-full"
      categories={categories}
      onChange={setFilters}
    />

    {/* Grilles des produits */}
    <ProductGrid categories={filteredCategories} />
  </div>;
};