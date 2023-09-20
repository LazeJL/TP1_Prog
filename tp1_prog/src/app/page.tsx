import React from 'react';
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { SectionContainer,BreadCrumbs,ProductGridLayout, ProductCardLayout } from 'tp-kit/components';
import { Button } from 'tp-kit/components';

export default function Home() {

  const categories = PRODUCTS_CATEGORY_DATA;

  return (

    <main>
        <SectionContainer>
            <BreadCrumbs items={[{
                label: "Accueil",
                url: '/'
            }]}/>
        </SectionContainer>

        {categories.map((category) => (
            <SectionContainer key={category.id}>
            <p>{category.name +" ("+category.products.length+")"}</p>
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

 