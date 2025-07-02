'use client';

import React from 'react';
import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';
import Button from '@/components/atoms/Button';
import ProductImage from '@/components/atoms/ProductImage';
import { Product } from '@/types';
import Link from 'next/link';
import { useCart } from '../../context/CardContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const header = (
    <Link href={`/product/${product.id}`} passHref>
      <ProductImage src={product.image} alt={product.title} />
    </Link>
  );

  return (
    <Card header={header} className="product-card">
      <Link href={`/product/${product.id}`} passHref>
        <h3 className="product-title">{product.title}</h3>
      </Link>
      <div className="product-rating">
        <Rating value={product.rating.rate} readOnly cancel={false} />
        <span className="ml-2 text-sm text-gray-600">({product.rating.count} yorum)</span>
      </div>
      <div className="product-price">${product.price.toFixed(2)}</div>
      <Button
        label="Sepete Ekle"
        icon="pi pi-shopping-cart"
        className="p-button-primary add-to-cart-button"
        onClick={() => addToCart(product)}
      />
    </Card>
  );
};

export default ProductCard;
