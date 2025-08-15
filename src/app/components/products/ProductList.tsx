import React from 'react'
import { Product } from '@/utils/types'
import { Card, Row, Col, Rate, Typography } from 'antd';
import Image from 'next/image'
import Link from 'next/link'
const { Meta } = Card;

interface ProductListProps {
    products: Product[] | null
} 

const ProductList: React.FC<ProductListProps> = ({products}) => {
  return (
        <Row gutter={32}>
      {
        products?.map((prod, key) => (
          <Col md={6} key={key} className='gutter-row'>
            <Link href={`/product/${prod.id}`}>
              <Card
                hoverable
                cover={<Image alt="example" src={prod.thumbnail} width={100} height={200} />}
              >
                <Typography.Title level={3} >{prod.title}</Typography.Title>
                <Meta  description={prod.brand} />
                <Rate value={prod.rating} allowHalf />
                <div>
                  <Typography.Title level={4} >{prod.price}</Typography.Title>
                </div>

              </Card>
            </Link>
          </Col>
        ))
      }

    </Row>
  )
}

export default ProductList