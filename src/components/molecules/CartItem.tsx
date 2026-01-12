"use client";

import styled from "styled-components";
import type { CartItem as Item } from "@/lib/types/types";
import { useCart } from "@/lib/context/CartContext";

const Wrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
  &:last-of-type {
    border-bottom: none;
  }
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
`;

const CartItemBody = styled.div`
 flex:1;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;


const Remove = styled.button`
  padding: 0.75rem;
  border: none;
  background:  transparent;
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
const Title = styled.h4`
  margin:0;
  font-size:1.20rem;
  line-height: 1.15;
  color: #0c5d56;
  @media(max-width:767.98px) {
    font-size: 1.15rem;
  }
`;
const Price = styled.p`
  padding:0.625rem;
  font-size:1.20rem;
  font-weight:600;
  color: #641ba3;
  @media(max-width:767.98px) {
    font-size: 1.15rem;
  }
`;

export default function CartItem({ item }: { item: Item }) {
  const { removeFromCart, increaseQty, decreaseQty } = useCart();

  return (
    <Wrapper>
      <Image src={item.image} alt={item.title} />

      <CartItemBody>
        <Title>{item.title}</Title>

        <Actions>
          <Counter onClick={() => decreaseQty(item.id)}>-</Counter>
          <span>{item.quantity}</span>
          <Counter onClick={() => increaseQty(item.id)}>+</Counter>
        </Actions>

        <Price>
          ${(item.price * item.quantity).toFixed(2)}
        </Price>
      </CartItemBody>

      <Remove onClick={() => removeFromCart(item.id)}>✕</Remove>
    </Wrapper>
  );
}
