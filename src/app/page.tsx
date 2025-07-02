// app/page.tsx
import { getProducts, getCategories } from '../lib/api/product';
import ProductList from '@/components/organisms/ProductList';
import { ProductFilterParams } from '@/types';
import { Suspense } from 'react';

// Bu sayfanın her zaman dinamik olarak render edilmesini sağlar.
export const dynamic = 'force-dynamic';

// Bu sayfa bir Server Component'tir.
// searchParams Next.js tarafından otomatik olarak sağlanır.
interface HomePageProps {
  searchParams: {
    limit?: string;
    offset?: string;
    sort?: 'asc' | 'desc';
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  // searchParams objesini Promise.resolve ile sarmalayarak Next.js'in beklentisini karşılamaya çalışıyoruz.
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const limit = parseInt(resolvedSearchParams.limit || '10', 10);
  const offset = parseInt(resolvedSearchParams.offset || '0', 10);

  // API'ye gönderilecek filtre parametrelerini oluştur
  const filterParams: ProductFilterParams = {
    limit,
    offset,
    sort: resolvedSearchParams.sort,
    category: resolvedSearchParams.category,
    minPrice: resolvedSearchParams.minPrice ? parseFloat(resolvedSearchParams.minPrice) : undefined,
    maxPrice: resolvedSearchParams.maxPrice ? parseFloat(resolvedSearchParams.maxPrice) : undefined,
    search: resolvedSearchParams.search,
  };

  // Tüm ürünleri ve kategorileri paralel olarak çek
  // Fiyat ve arama filtrelemesi API tarafından desteklenmediği için
  // tüm ürünleri çekip client tarafında filtreleme yapıyoruz.
  // Gerçek bir uygulamada, API bu filtreleri desteklemelidir.
  const allProductsPromise = getProducts({ limit: 0 }); // Tüm ürünleri çekmek için limit 0 veya çok yüksek bir sayı
  const categoriesPromise = getCategories();

  const [allProducts, categories] = await Promise.all([allProductsPromise, categoriesPromise]);

  // Client tarafında uygulanacak filtreleri uygula
  let filteredProducts = allProducts;

  if (filterParams.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.price >= filterParams.minPrice!);
  }
  if (filterParams.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.price <= filterParams.maxPrice!);
  }
  if (filterParams.search) {
    const lowerCaseSearch = filterParams.search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => p.title.toLowerCase().includes(lowerCaseSearch));
  }
  if (filterParams.category && filterParams.category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === filterParams.category);
  }

  // Sıralama
  if (filterParams.sort) {
    filteredProducts.sort((a, b) => {
      if (filterParams.sort === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  // Sayfalama için ürünleri dilimle
  const paginatedProducts = filteredProducts.slice(offset, offset + limit);
  const totalFilteredProducts = filteredProducts.length;

  return (
    <Suspense fallback={<div>Ürünler yükleniyor...</div>}>
      <ProductList
        products={paginatedProducts}
        totalProducts={totalFilteredProducts}
        initialCategories={categories}
        loading={false} // Veri zaten server'da çekildiği için burada false
      />
    </Suspense>
  );
}
