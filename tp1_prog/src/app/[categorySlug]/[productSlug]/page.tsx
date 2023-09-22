import React from 'react';
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { NextPageProps } from '@/types';
import { Button, ProductCardLayout, ProductGridLayout, SectionContainer } from 'tp-kit/components';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  categorySlug: string;
  productSlug: string;
};

export default function Product({ params }: NextPageProps<Props>) {
  const category = PRODUCTS_CATEGORY_DATA.find(cat => cat.slug === params.categorySlug);

  if (!category) {
    return <div>Catégorie non trouvée</div>;
  }

  const selectedProduct = category.products.find(product => product.slug === params.productSlug);

  if (!selectedProduct) {
    return <div>Produit non trouvé</div>;
  }

  const otherProducts = category.products.filter(product => product.slug !== params.productSlug);

  return (
    <div>
      <SectionContainer key={selectedProduct.id}>
        <div className="flex">
          <Image src={selectedProduct.img} alt={selectedProduct.name} className="w-32 h-32 mr-4" width="300" height="300" />
          <div>
            <h1>{selectedProduct.name}</h1>
            <p>{selectedProduct.desc + " " + selectedProduct.price}</p>
            <Button fullWidth variant="ghost">Ajouter au panier</Button>
          </div>
        </div>
      </SectionContainer>

      <h2>Vous aimerez aussi</h2>
      <ProductGridLayout products={otherProducts}>
        {(product) => (
          <ProductCardLayout key={product.id} product={product} button={<Button fullWidth variant="ghost">Ajouter au panier</Button>} />
        )}
      </ProductGridLayout>

      <Link href={`/${category.slug}`} passHref>
        <p>Retour à la catégorie {category.name}</p>
      </Link>
    </div>
  );
}
