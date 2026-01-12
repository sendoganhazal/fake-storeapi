"use client";

import styled from "styled-components";
import { useCart } from "@/lib/context/CartContext";
import { useUI } from "@/lib/context/UIContext";
import Button from "@/components/atoms/Button";

const Wrapper = styled.header`
  padding: 16px;
 background-color:#a855f7;
 color:#fff;
  display: flex;
  justify-content: space-between;
  align-items:center;
`;
const Logo = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
`;

const CartWrapper = styled.div`
  position: relative;
`;

const Badge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background: #ef4444;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 999px;
  font-weight: 600;
  min-width: 18px;
  text-align: center;
`;

export default function Header() {
  const { items } = useCart();
  const { openCart } = useUI();
console.log("HEADER ITEMS", items);

   const totalItems = items.reduce(
    (sum, item) => sum + (item.quantity ?? 0),
    0
  );

  console.log("TOTAL ITEMS", totalItems);

  return (
    <Wrapper>
      <Logo>Fake Store</Logo>

      <CartWrapper>
        <Button onClick={openCart}>🛒 Cart</Button>

        {totalItems > 0 && (
          <Badge>{totalItems}</Badge>
        )}
      </CartWrapper>
    </Wrapper>
  );
}