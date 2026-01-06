"use client";

import styled from "styled-components";
import { useCart } from "@/lib/context/CardContext";

const Wrapper = styled.header`
  padding: 16px;
 background-color:#a855f7;
 color:#fff;
  display: flex;
  justify-content: space-between;
`;

export default function Header() {
  const { items } = useCart();

  return (
    <Wrapper>
      <strong>Fake Store</strong>
      <span>Cart ({items.length})</span>
    </Wrapper>
  );
}
