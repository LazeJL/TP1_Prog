"use client";

import { ProductsCategoryData } from "tp-kit/types";
import { ProductFilters } from "./product-filters"
import { BreadCrumbs, Button, Heading, ProductCardLayout, ProductGridLayout, SectionContainer } from 'tp-kit/components';
import { useEffect, useMemo, useState } from "react";
import { ProductFilterResult } from "@/types";
import { filterProducts } from "@/utils/filter-products";
import Link from "next/link";

type Props = {categories : ProductsCategoryData[], showFilters: boolean}

export default function ProductList({categories, showFilters = false} : Props) {

    const [filter, setFilter] = useState<ProductFilterResult>({
      categoriesSlug: [],
      search: ""
    })

    // const [filtered, setFiltered] = useState<ProductsCategoryData[]>([...categories])

    //useEffect(
      //() => setFiltered([...filterProducts(categories, filter)]), [categories, filter]
    //)

    const filtered = useMemo(() => filterProducts(categories, filter), [categories, filter]);

    function updateList(filter : ProductFilterResult) {
      setFilter({
        categoriesSlug: filter.categoriesSlug,
        search: filter.search
      })
    }
    
    console.log(categories)

    return (
        <div className="flex">
        <SectionContainer>
          {showFilters ? <ProductFilters categories={categories} onChange={updateList}/> : ""}
        </SectionContainer>
        <div className="flex-1">
        {filtered.map((category,index) => <SectionContainer key={index}>
            <Link className="link" href={category.slug}><Heading as="h1" size="md" weight="bold">{category.name + '(' + category.products.length + ')'}</Heading></Link>
            
  
            <ProductGridLayout products={category.products}>
              {(product) => <ProductCardLayout key={product.id} button={<Button variant="ghost">Ajouter au panier</Button>}
                  product={{
                    desc: product.desc,
                    id: product.id,
                    img: product.img,
                    name: product.name,
                    path: product.path,
                    price: product.price,
                    slug: product.slug}}
              />}
  
            </ProductGridLayout>
            
          </SectionContainer>)}
        </div>
        
        </div>
        
    )

}