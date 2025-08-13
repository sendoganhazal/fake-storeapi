"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from "next/navigation"
import { Product } from '@/utils/types'
import { fetchProductByCategory } from '@/utils/api-fetchers'
import { ParamValue } from 'next/dist/server/request/params'
import { Card, Row, Col, Rate } from 'antd';
import Image from 'next/image'
import Link from 'next/link'
const { Meta } = Card;

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
  console.log("products", products)
  return (
    <Row  gutter={32}>
      {
        products?.map((prod, key) => (
          <Col md={6} key={key} className='gutter-row'>
            <Link href={`/product/${prod.id}`}>
              <Card
                hoverable
                cover={<Image alt="example" src={prod.thumbnail} width={100} height={200} />}
              >
                <Meta title={prod.title} description={prod.brand} />
                <Rate value={prod.rating}  allowHalf/>
              </Card>
            </Link>
          </Col>
        ))
      }

    </Row>
  )
}
export default Page