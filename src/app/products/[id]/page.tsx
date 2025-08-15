"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from "next/navigation"
import { Product } from '@/utils/types'
import { fetchProductByCategory } from '@/utils/api-fetchers'
import { ParamValue } from 'next/dist/server/request/params'
import ProductList from '../../components/products/ProductList'

async function getProductByBCategory(params: ParamValue) {
  const response = await fetchProductByCategory(params);
  return response;
}

const Page = () => {
  const { id } = useParams();

  const [products, setProducts] = useState<Product[] | null>(null)
  console.log("id", typeof id)
  async function fetcher(params: ParamValue) {
    const res = await getProductByBCategory(params);
    const data = res;
    setProducts(data)
  }
  useEffect(() => {
    fetcher(id);

  }, [])
  return (
    <section>
      <ProductList products={products}/>
    </section>
  )
}
export default Page