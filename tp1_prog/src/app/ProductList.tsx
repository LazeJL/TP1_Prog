import React, { useState } from 'react';
import { SectionContainer, ProductGridLayout, ProductCardLayout, Button } from 'tp-kit/components';
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { ProductFilters } from '@/components/product-filters';
import { ProductFilterResult } from '@/ProductFilterResult';

export default function ProductList() {
    const categories = PRODUCTS_CATEGORY_DATA;
    const [filteredCategories, setFilteredCategories] = useState(categories);

    const handleFilterChange = (filters: ProductFilterResult) => {
        let filteredCategories = [...categories];

        console.log(filteredCategories) 
  
        if (filters.categoriesSlug.length > 0) {
          filteredCategories = filteredCategories.filter(category =>
            filters.categoriesSlug.includes(category.slug)
          );
        }

        console.log(filteredCategories)
        setFilteredCategories(filteredCategories);
        console.log(filteredCategories)
      };

    return (
        <main>
            <ProductFilters categories={categories} onChange={handleFilterChange} />
            
            {filteredCategories.map((category) => (
                <SectionContainer key={category.id}>
                    <p>{category.name + " (" + category.products.length + ")"}</p>
                    <ProductGridLayout products={category.products}>
                        {(product) => (
                            <ProductCardLayout key={product.id} product={product} button={<Button fullWidth variant="ghost">Ajouter au panier</Button>} />
                        )}
                    </ProductGridLayout>
                </SectionContainer>
            ))}
        </main>
    );
}
