"use client"
import React, { useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { ParamValue } from 'next/dist/server/request/params';
import { Product } from '@/utils/types';
import { searchedProducts } from '@/utils/api-fetchers';
import { Card, Row, Col, Rate, Typography } from 'antd';
import Image from 'next/image'
import Link from 'next/link'
const { Meta } = Card;

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


  console.log(products)
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

export default Products