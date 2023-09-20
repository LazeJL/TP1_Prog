"use client";
//import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { SectionContainer, BreadCrumbs, ProductGridLayout, ProductCardLayout } from 'tp-kit/components';
//import { Button } from 'tp-kit/components';
//import { ProductFilters } from '@/components/product-filters';
//import { ProductFilterResult } from '@/ProductFilterResult';
//import { useState } from "react";
import ProductList from './ProductList';

export default function Home() {
  
  return (
    <main>
      <SectionContainer>
        <BreadCrumbs items={[
          {
            label: "Accueil",
            url: '/'
          }
        ]}/>
      </SectionContainer>

      <ProductList/>
    </main>
  );
}
