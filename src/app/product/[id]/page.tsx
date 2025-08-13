"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from "next/navigation"
import { Product } from '@/utils/types'
import { fetchProduct } from '@/utils/api-fetchers'
import { ParamValue } from 'next/dist/server/request/params'
import { Carousel, Row, Col, Breadcrumb, Card, List, Typography, Tag, Rate, Button } from 'antd';
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
  },
  {
    key: 'reviews',
    label: 'Reviews',
  },
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
  const listItem = [
    {
      title: "SKU",
      label: product?.sku
    },
    {
      title: "Title",
      label: product?.title,
    },
    {
      title: "Brand",
      label: product?.brand,
    },
    {
      title: "Tags",
      label: product?.tags?.map((tag, key) => <Tag key={key} color='magenta'>{tag.toUpperCase()}</Tag>),
    },
    {
      title: "Dimensions",
      label: product?.dimensions.width + "x" + product?.dimensions.height + "x" + product?.dimensions.depth
    },
    {
      title: "Return Policy",
      label: product?.returnPolicy
    },
    {
      title: "Warranty Information",
      label: product?.warrantyInformation
    },
    {
      title: "Shipping Information",
      label: product?.shippingInformation
    },
    {
      title: "Availability Status",
      label: product?.availabilityStatus
    },
    {
      title: "Minimum Order Quantity",
      label: product?.minimumOrderQuantity
    },
  ]
  const reviewsList = product?.reviews?.map((r) => ({
    name: r.reviewerName,
    comment: r.comment,
    rating: r.rating
  }))
  const propertyData = () => (
    <List
      bordered
      dataSource={listItem}
      renderItem={(item) => (
        <List.Item>
          <Typography.Title level={5}>{item.title}</Typography.Title>
          <Typography.Text>{item.label}</Typography.Text>
        </List.Item>
      )}
    />
  )
  const reviewsData = () => (
    <List
      bordered
      dataSource={reviewsList}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={item.name}
            description={item.comment}
          />
          <Rate allowHalf value={item.rating} />
        </List.Item>
      )}
    />
  )
  const contentListNoTitle: Record<string, React.ReactNode> = {
    description: descriptonData(),
    properties: propertyData(),
    reviews: reviewsData()
  };
  return (
    <Row gutter={16}>
      <Col md={16}>
        <Breadcrumb items={items} />
        <Typography.Title>{product?.title}</Typography.Title>
        <Typography.Title level={4} color='gray'>{product?.brand}</Typography.Title>
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
        <Typography.Paragraph>SKU: {product?.sku}</Typography.Paragraph>
        <Rate value={product?.rating} allowHalf />
        <Typography.Paragraph>{product?.reviews.length + "" + "reviews"}</Typography.Paragraph>
        <Typography.Title level={2}>{product?.price + " " + "EUR"} </Typography.Title>
        <Button type="primary" size='large' style={{ width: "100%" }}>ADD TO CART</Button>
      </Col>
    </Row>
  )
}
export default Page