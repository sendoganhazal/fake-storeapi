import React from 'react'
import { Product } from '@/utils/types'
import { Row, Col } from 'antd';
import Link from 'next/link'
import ProductCard from './ProductCard';


interface ProductListProps {
  products: Product[] | null
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Row gutter={32}>
      {
        products?.map((prod, key) => (
          <Col md={6} key={key} className='gutter-row'>
            <ProductCard prod={prod} />
          </Col>
        ))
      }

    </Row>
  )
}

export default ProductList