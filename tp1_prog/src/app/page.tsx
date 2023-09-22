"use client";
import { SectionContainer, BreadCrumbs} from 'tp-kit/components';
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

      <ProductList showFilters={false}/>
    </main>
  );
}
