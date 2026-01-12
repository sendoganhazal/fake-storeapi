"use client";

import styled from "styled-components";
import type { CartItem as Item } from "@/lib/types/types";
import { useCart } from "@/lib/context/CartContext";

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;


const Remove = styled.button`
  padding: 0.75rem;
  border: none;
  background:  #fff;
  cursor: pointer;
  font-size:0.875rem;
  font-weight:700;
  border-radius: 10px;
  display:block;
  color: #ef4444;
`;

const Counter = styled.button`
  padding: 0.75rem;
  border: none;
  color: #fff;
  background:  #06b6d4;
  cursor: pointer;
  font-size:0.875rem;
  font-weight:500;
  border-radius: 10px;
  display:block;
`;

const Price = styled.p`
  padding:0.625rem;
 font-size:1.20rem;
 font-weight:600;
 color: #641ba3;
`;

export default function CartItem({ item }: { item: Item }) {
  const { removeFromCart, increaseQty, decreaseQty } = useCart();

  return (
    <Wrapper>
      <Image src={item.image} alt={item.title} />

      <div style={{ flex: 1 }}>
        <strong>{item.title}</strong>

        <Actions>
          <Counter onClick={() => decreaseQty(item.id)}>-</Counter>
          <span>{item.quantity}</span>
          <Counter onClick={() => increaseQty(item.id)}>+</Counter>
        </Actions>

        <Price>
          ${(item.price * item.quantity).toFixed(2)}
        </Price>
      </div>

      <Remove onClick={() => removeFromCart(item.id)}>✕</Remove>
    </Wrapper>
  );
}
