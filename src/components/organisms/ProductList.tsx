'use client';

import React from 'react';
import ProductCard from '@/components/molecules/ProductCard';
import Pagination from '@/components/molecules/Pagination';
import FilterControls from '@/components/molecules/FilterControls';
import { Product } from '@/types';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ProgressSpinner } from 'primereact/progressspinner'; 

interface ProductListProps {
  products: Product[];
  totalProducts: number;
  initialCategories: string[];
  loading: boolean; 
}


const ProductList: React.FC<ProductListProps> = ({ products, totalProducts, initialCategories, loading }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const limit = 10; 
  const currentOffset = parseInt(searchParams.get('offset') || '0', 10);
//   const currentPage = Math.floor(currentOffset / limit);

  const onPageChange = (event: { first: number; rows: number; page: number; pageCount: number }) => {
    const newOffset = event.first;
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('offset', newOffset.toString());
    router.push(`${pathname}?${currentParams.toString()}`);
  };

  return (
    <div className="product-list-container">
      <FilterControls initialCategories={initialCategories} />

      {loading ? (
        <div className="loading-container">
          <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination
            first={currentOffset}
            rows={limit}
            totalRecords={totalProducts}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <div className="no-products-message">
          Gösterilecek ürün bulunamadı. Filtreleri veya arama terimini değiştirmeyi deneyin.
        </div>
      )}
    </div>
  );
};

export default ProductList;
