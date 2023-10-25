import { BreadCrumbs, SectionContainer } from "tp-kit/components";
import { ProductList } from "../components/product-list";
import { Metadata } from "next";
import prisma from "@/utils/prisma";

export const metadata: Metadata = {
  title: `Page d’accueil - Starbucks`,
  description: "Commandez de délicieuses boissons préparées avec soin par nos baristas",
}

  const categories = await prisma.productCategory.findMany({
    include: {
      products: true,
    },
  });


export default async function Home() {
  return (<SectionContainer>
    <BreadCrumbs items={[
      {
        label: "Accueil",
        url: "/"
      }
    ]} />

    <ProductList categories={categories} showFilters />
  </SectionContainer>);
}