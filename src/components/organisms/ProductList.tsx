"use client";

import styled from "styled-components";
import { Product } from "@/lib/types/types";
import ProductCard from "@/components/molecules/ProductCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <Grid>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
}
