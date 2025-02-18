import { Metadata } from "next";
import { BreadCrumbs } from "@arthur.eudeline/starbucks-tp-kit/components/breadcrumbs";
import { SectionContainer } from "@arthur.eudeline/starbucks-tp-kit/components/section-container";
// Data
import { ProductGridWithFilters } from "@/components/product-grid-with-filters";
import prisma from "@/prisma";


export const metadata:Metadata = {
  title: `Page d’accueil - Starbucks`,
  description: "Commandez de délicieuses boissons préparées avec soin par nos baristas"
}

export default async function Home() {
  const categories = await prisma.productCategory.findMany({
    include: {
      products: true
    }
  });

  return (
    <main>
      <SectionContainer>
        {/* Fil d'arianne */}
        <BreadCrumbs items={[
          {
            label: "Accueil",
            url: ""
          }
        ]} />

        {/* Grille Produit */}
        <ProductGridWithFilters categories={categories} />
      </SectionContainer>
    </main>
  );
}
