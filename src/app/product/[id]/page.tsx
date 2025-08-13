"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from "next/navigation"
import { Product } from '@/utils/types'
import { fetchProduct } from '@/utils/api-fetchers'
import { ParamValue } from 'next/dist/server/request/params'
import { Carousel, Row, Col, Breadcrumb, Card } from 'antd';
import Image from 'next/image'
import Link from 'next/link'


async function getProduct(params: ParamValue) {
  const response = await fetchProduct(params);
  return response;
}
const tabListNoTitle = [
  {
    key: 'description',
    label: 'Description',
  },
  {
    key: 'properties',
    label: 'Properties',
  }
];

const Page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null)
  console.log("id", typeof id)
  const [activeTabKey, setActiveTabKey] = useState<string>('description');

  async function fetcher(params: ParamValue) {
    const res = await getProduct(params);
    const data = res;
    setProduct(data)
  }
  useEffect(() => {
    fetcher(id);

  }, [])
  const items = [
    {
      title: <Link href={`/`}>Home</Link>,
    },
    {
      title: <Link href={`/products/${product?.category}`}>{product?.category}</Link>,
    },
  ]
  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };
  const descriptonData = () => (
    <p>{product?.description}</p>
  )
  const contentListNoTitle: Record<string, React.ReactNode> = {
    description: descriptonData(),
    properties: <p>project content</p>,
  };
  return (
    <Row gutter={16}>
      <Col md={16}>
        <Breadcrumb items={items} />
        <h1>{product?.title}</h1>
        <p>{product?.brand}</p>
        <Carousel arrows>
          {
            product?.images.map((img, key) => (
              <div key={key} className='carousel-image'>
                <Image alt={product.title} src={img} width={100} height={100} />
              </div>
            ))
          }
        </Carousel>
        <Card
          style={{ width: '100%' }}
          tabList={tabListNoTitle}
          activeTabKey={activeTabKey}
          onTabChange={onTabChange}
          tabProps={{
            size: 'middle',
          }}
        >
          {contentListNoTitle[activeTabKey]}
        </Card>
      </Col>
      <Col md={8}>
      </Col>
    </Row>
  )
}
export default Page