"use client";

import styled from "styled-components";
import { useCart } from "@/lib/context/CartContext";
import CartItem from "@/components/molecules/CartItem";
import Button from "@/components/atoms/Button";

const Wrapper = styled.main`
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const TotalBox = styled.div`
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function CartPageClient() {
  const { items } = useCart();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <Wrapper>
        <h1>Sepet</h1>
        <p>Sepetiniz boş 🛒</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header>
        <h1>Sepet</h1>
        <span>{items.length} ürün</span>
      </Header>

      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <TotalBox>
        <strong>Toplam: ${totalPrice.toFixed(2)}</strong>
        <Button>Checkout</Button>
      </TotalBox>
    </Wrapper>
  );
}
