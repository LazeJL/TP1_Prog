"use client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { SectionContainer, BreadCrumbs, ProductGridLayout, ProductCardLayout } from 'tp-kit/components';
import { Button } from 'tp-kit/components';
import { ProductFilters } from '@/components/product-filters';
import { ProductFilterResult } from '@/ProductFilterResult';

export default function Home() {

  const categories = PRODUCTS_CATEGORY_DATA;

  const handleFilterChange = (filters: ProductFilterResult) => {
    console.log(filters);
  };

  return (
    <main>

      <ProductFilters categories={categories} onChange={handleFilterChange} />

      <SectionContainer>
        <BreadCrumbs items={[
          {
            label: "Accueil",
            url: '/'
          }
        ]}/>
      </SectionContainer>

      

      {categories.map((category) => (
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
