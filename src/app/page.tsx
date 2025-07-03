import { getCategories } from '@/lib/api/product';
import ProductList from '@/components/organisms/ProductList';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const categoriesPromise = getCategories();
  const categories = await categoriesPromise;

  return (
    <Suspense fallback={<div>Ürünler yükleniyor...</div>}>
      <ProductList initialCategories={categories} />
    </Suspense>
  );
}
