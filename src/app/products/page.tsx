"use client"
import React, { useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { ParamValue } from 'next/dist/server/request/params';
import { Product } from '@/utils/types';
import { searchedProducts } from '@/utils/api-fetchers';
import ProductList from '../components/products/ProductList';

async function getSearchedProducts(params: string) {
  const response = await searchedProducts(params);
  return response;
}

const Products = () => {
  const [products, setProducts] = useState<Product[] | null>(null)
  const param = useSearchParams();
  const pathname = usePathname();
  const keyword = param.get('q');
  const fetch_url = `${pathname}/search?limit=0&q=${keyword}`;
  async function searchProduct() {
    const products = await getSearchedProducts(fetch_url);
    setProducts(products)
  }
  useEffect(() => {
    searchProduct();
  }, [])

  return (
    <section>
      <ProductList products={products}/>
    </section>
  )
}

export default Products