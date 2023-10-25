import { BreadCrumbs, SectionContainer } from "tp-kit/components";
import { ProductList } from "../../components/product-list";
import { NextPageProps } from "../../types";
import { Metadata } from "next";
import prisma from "@/utils/prisma";
import { cache } from "react";


export const getCategory = cache(async (slug: string) => {
  console.log(getCategory)
  return await prisma.productCategory.findUnique({ include: { products: true },where: { slug: slug }})
})


type Props = {
  categorySlug: string;
};

export async function generateMetadata({ params, searchParams} : NextPageProps<Props>) : Promise<Metadata> {
  const category = await getCategory(params.categorySlug);

  if (!category) {
    const error = new Error("Category not found");
    (error as any).statusCode = 404;
    throw error;
  }

  return {
    title: category.name,
    description: `Trouvez votre inspiration avec un vaste choix de boissons Starbucks parmi nos produits ${category.name}`
  }
}

export default async function CategoryPage({params}: NextPageProps<Props>) {
  const category = await getCategory(params.categorySlug);

  if (!category) {
    const error = new Error("Category not found");
    (error as any).statusCode = 404;
    throw error;
  }

  return <SectionContainer>
    <BreadCrumbs 
      items={[
        {
          label: "Accueil",
          url: "/"
        },
        {
          label: category.name,
          url: `/${category.slug}`
        }
      ]}
    />

    <ProductList categories={[category]} />
  </SectionContainer>
}