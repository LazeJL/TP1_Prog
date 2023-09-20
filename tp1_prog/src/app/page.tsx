import Image from 'next/image'
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
const categories = PRODUCTS_CATEGORY_DATA;

export default function Home() {
  return (
    <main>
        <SectionContainer>
            <ProductGridLayout>
                  {categories.map((category) => (
                    <ProductCard key={category.id}>
                        <ProductCardImage>
                            <Image
                                src={category.image}
                                alt={category.name}
                                layout="fill"
                                objectFit="cover"
                            />
                        </ProductCardImage>
                        <ProductCardTitle>{category.name}</ProductCardTitle>
                 ))}
            </ProductGridLayout>
        </SectionContainer>
    </main>
  )
}
