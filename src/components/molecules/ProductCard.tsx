"use client";

import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types/types";
import Button from "@/components/atoms/Button";
import { useCart } from "@/lib/context/CartContext";

const Card = styled.div`
   border: 1px solid #e4e4e7;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ImageWrapper = styled.div`
  width:100%;
  height: 250px;
`;
const CardBody = styled.div`
  padding: 0 1rem 1rem;
   display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const CardTitle = styled.h4`
 margin:0;
 padding: 1rem 1rem 0.625rem;
 font-size:1.20rem;
 line-height: 1.15;
 color: #0c5d56;
`;

const Rating = styled.p`
 margin: 0;
 padding-bottom:0.625rem;
 font-size:1rem;
`;

const Price = styled.p`
 margin:0;
  padding-bottom:0.625rem;
 font-size:1.20rem;
 font-weight:600;
 color: #641ba3;
`;

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <Card>
      <Link href={`/products/${product.id}`}>
        <ImageWrapper>
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            className="img"
          />
        </ImageWrapper>
        <CardTitle>{product.title}</CardTitle>
      </Link>
      <CardBody>
        <Rating>⭐ {product.rating.rate}</Rating>
        <Price>{product.price} $</Price>

        <Button onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </CardBody>
    </Card>
  );
}
