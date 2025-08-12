"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from "next/navigation"
import { Product } from '@/utils/types'
import { fetchProduct } from '@/utils/api-fetchers'
import { ParamValue } from 'next/dist/server/request/params'
import { Carousel, Row, Col } from 'antd';
import Image from 'next/image'
import Link from 'next/link'


async function getProduct(params: ParamValue) {
  const response = await fetchProduct(params);
  return response;
}

const Page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product[] | null>(null)
  console.log("id", typeof id)

    async function fetcher(params: ParamValue) {
      const res = await getProduct(params);
      const data = res;
      setProduct(data)
    }
    useEffect(() => {
      fetcher(id);
  
    }, [])
    console.log("products", product)
  return (
    <Row justify={'center'} gutter={16}>
        <Col md={16}>
        A
        </Col>
        <Col md={4}>
        </Col>
    </Row>
  )
}
export default Page