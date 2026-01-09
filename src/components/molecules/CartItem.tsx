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
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
`;

export default function CartItem({ item }: { item: Item }) {
  const { removeFromCart, increaseQty, decreaseQty } = useCart();

  return (
    <Wrapper>
      <Image src={item.image} alt={item.title} />

      <div style={{ flex: 1 }}>
        <strong>{item.title}</strong>

        <Actions>
          <button onClick={() => decreaseQty(item.id)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => increaseQty(item.id)}>+</button>
        </Actions>

        <p>
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      <Remove onClick={() => removeFromCart(item.id)}>✕</Remove>
    </Wrapper>
  );
}
