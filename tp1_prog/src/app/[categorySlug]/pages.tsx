"use client";
import React from 'react';
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { NextPageProps } from '@/types';
import { notFound } from 'next/navigation';

const categories = PRODUCTS_CATEGORY_DATA;

type Props = {
  categorySlug: string;
};

export default function Home({ params }: NextPageProps<Props>) {
  const { categorySlug } = params;
  const currentCategory = categories.find(category => category.slug === categorySlug);

  if (!currentCategory) {
    notFound();
    return null;
  }

  return (
    <div>
      <h1>{currentCategory.name}</h1>
      {/* Affichez ici les produits de la catégorie */}
    </div>
  );
}