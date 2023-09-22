"use client";
import { SectionContainer, BreadCrumbs} from 'tp-kit/components';
import ProductList from './ProductList';

export default function Home() {

  const showFilters = false
  
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

      <ProductList showFilters={showFilters}/>
    </main>
  );
}
