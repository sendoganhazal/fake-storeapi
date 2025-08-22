'use client';

import React from 'react';
import { Product } from '@/utils/types';
import { Button, Card, Rate, Typography } from 'antd';
import Image from 'next/image'
import Link from 'next/link';
import { useCart } from '@/utils/CardContext';

const { Meta } = Card;

interface ProductCardProps {
  prod: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ prod }) => {
  const { addToCart } = useCart();



  return (
    <Card
      hoverable
      cover={<Image alt="example" src={prod.thumbnail} width={100} height={200} />}
      actions={[<Button type='primary' key={prod.id} onClick={() => addToCart(prod)}>Add to Cart</Button>]}
    >
      <Link href={`/product/${prod.id}`}>
        <Typography.Title level={3} >{prod.title}</Typography.Title>
        <Meta description={prod.brand} />
        <Rate value={prod.rating} allowHalf />
        <div>
          <Typography.Title level={4} >{prod.price}</Typography.Title>
        </div>
      </Link>


    </Card>

  );
};

export default ProductCard;