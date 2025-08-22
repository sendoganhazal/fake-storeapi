"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from "next/navigation"
import { Product } from '@/utils/types'
import { fetchProduct } from '@/utils/api-fetchers'
import { ParamValue } from 'next/dist/server/request/params'
import {  Row, Col, Typography, Rate, Button } from 'antd';
import ProductDetailHeader from '@/app/components/products/ProductDetailHeader'
import ProductImagesCarousel from '@/app/components/products/ProductImagesCarousel'
import ProductDetailOverview from '@/app/components/products/ProductDetailOverview'


async function getProduct(params: ParamValue) {
  const response = await fetchProduct(params);
  return response;
}


const Page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null)
  console.log("id", typeof id)

  async function fetcher(params: ParamValue) {
    const res = await getProduct(params);
    const data = res;
    setProduct(data)
  }
  useEffect(() => {
    fetcher(id);

  }, [])



  return (
    <Row gutter={16}>
      <Col md={16}>
        <ProductDetailHeader product={product}/>
        <ProductImagesCarousel images={product?.images}/>
        <ProductDetailOverview product_detail={product}/>
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