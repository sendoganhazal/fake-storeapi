// components/organisms/ProductDetailDisplay.tsx
"use client";

import React from "react";
import { Product } from "@/types";
import ProductImage from "../atoms/ProductImage";
import Button from "@/components/atoms/Button";
import { Rating } from "primereact/rating";
import { useCart } from "../../context/CardContext";

interface ProductDetailDisplayProps {
  product: Product;
}

const ProductDetailDisplay: React.FC<ProductDetailDisplayProps> = ({
  product,
}) => {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <div className="grid grid-nogutter">
        <div className="image-section col-12 md:col-4">
          <ProductImage
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            priority
          />
        </div>
        <div className="details-section col-12 md:col-8">
          <h1 className="product-title">{product.title}</h1>
          <div className="product-rating">
            <Rating value={product.rating.rate} readOnly cancel={false} />
            <span className="ml-2 text-lg">({product.rating.count} yorum)</span>
          </div>
          <div className="product-price">${product.price.toFixed(2)}</div>
          <Button
            label="Sepete Ekle"
            icon="pi pi-shopping-cart"
            className="p-button-primary add-to-cart-button"
            onClick={() => addToCart(product)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailDisplay;
