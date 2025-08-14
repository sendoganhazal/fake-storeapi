import React from 'react'
import {  Breadcrumb, Typography } from 'antd';
import Link from 'next/link'
import { Product } from '@/utils/types'

interface ProductProps {
    product: Product | null
}

const ProductDetailHeader: React.FC<ProductProps> = ({product}) => {
      const items = [
    {
      title: <Link href={`/`}>Home</Link>,
    },
    {
      title: <Link href={`/products/${product?.category}`}>{product?.category}</Link>,
    },
  ]
  return (
    <section>
        <Breadcrumb items={items} />
        <Typography.Title>{product?.title}</Typography.Title>
        <Typography.Title level={4} color='gray'>{product?.brand}</Typography.Title>
    </section>
  )
}

export default ProductDetailHeader