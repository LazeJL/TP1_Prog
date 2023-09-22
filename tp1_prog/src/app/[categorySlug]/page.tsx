import React from 'react';
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { NextPageProps } from '@/types';
import { Button, ProductCardLayout, ProductGridLayout, SectionContainer } from 'tp-kit/components';
import Link from 'next/link';

type Props = {
  categorySlug: string;
};

export default function Category({ params }: NextPageProps<Props>) {
  const category = PRODUCTS_CATEGORY_DATA.find(cat => cat.slug === params.categorySlug);

  if (!category) {
    return <div>Catégorie non trouvée</div>;
  }

  return (
    <SectionContainer key={category.id}>
      <Link href={`/category/${category.slug}`} passHref>
        <p>{category.name} ({category.products.length})</p>
      </Link>
      <ProductGridLayout products={category.products}>
        {(product) => (
          <ProductCardLayout key={product.id} product={product} button={<Button fullWidth variant="ghost">Ajouter au panier</Button>} />)}
      </ProductGridLayout>
    </SectionContainer>
  );
}