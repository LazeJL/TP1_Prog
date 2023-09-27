import React, { useState } from 'react';
import { SectionContainer, ProductGridLayout, ProductCardLayout, Button } from 'tp-kit/components';
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { ProductFilters } from '@/components/product-filters';
import { ProductFiltersResult } from '@/types';
import Link from 'next/link';
import { addLine } from '@/hooks/use-cart';

interface ProductListProps {
    showFilters: boolean;
  }

export default function ProductList({showFilters}: ProductListProps) {
    const categories = PRODUCTS_CATEGORY_DATA;
    const [filteredCategories, setFilteredCategories] = useState(categories);

    const handleFilterChange = (filters: ProductFiltersResult) => {
        let filteredCategories = [...categories];

        console.log(filteredCategories) 
  
        if (filters.categoriesSlugs.length > 0) {
          filteredCategories = filteredCategories.filter(category =>
            filters.categoriesSlugs.includes(category.slug)
          );
        }

        console.log(filteredCategories)
        setFilteredCategories(filteredCategories);
        console.log(filteredCategories)
      };

    return (
        <main>
          <div className="flex mx-5">
            <div className="flex-auto mt-10">
              <ProductFilters categories={categories} onChange={handleFilterChange} />
            </div>
            <div className="flex-auto">
              {filteredCategories.map((category) => (
                  <SectionContainer key={category.id}>
                      <Link href={`/${category.slug}`} passHref>
                          <p>{category.name} ({category.products.length})</p>
                      </Link>
                      <ProductGridLayout products={category.products}>
                          {(product) => (
                              <ProductCardLayout key={product.id} product={product} button={<Button fullWidth variant="ghost" onClick={() => addLine(product)}>Ajouter au panier</Button>} />)}
                      </ProductGridLayout>
                  </SectionContainer>
              ))}
            </div>
          </div>
        </main>
    );
}
