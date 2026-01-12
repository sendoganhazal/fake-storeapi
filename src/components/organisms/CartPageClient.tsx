"use client";

import styled from "styled-components";
import { useCart } from "@/lib/context/CartContext";
import CartItem from "@/components/molecules/CartItem";
import Button from "@/components/atoms/Button";


const Panel = styled.section`
  background-color: #fff;
  border: 1px solid #e4e4e7;
  border-radius: 10px;
  margin: 50px 0;
  height: 100%;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  padding: 1.25rem;
  background-color:#ccfbf1;
  border-radius:10px 10px 0 0;
  @media(max-width:767.98px) {
    padding: 1rem;
  }
`;

const PanelBody = styled.div`
  padding: 1.25rem;
  @media(max-width:767.98px) {
    padding: 1rem;
  }
`;

const PanelFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background-color: #ecfeff;
  border-radius:0 0 10px 10px;
  @media(max-width:767.98px) {
    padding: 1rem;
  }
`;
const Price = styled.p`
  font-size:1.20rem;
  font-weight:600;
  color: #641ba3;
`;


export default function CartPageClient() {
  const { items } = useCart();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="container">
        <Panel>
          <PanelHeader>
            <h1>Sepet</h1>
          </PanelHeader>
          <PanelBody>

            <p>Sepetiniz boş 🛒</p>
          </PanelBody>
        </Panel>

      </main>
    );
  }

  return (
    <main className="container">
      <Panel>
        <PanelHeader>
          <h1>Sepet</h1>
          {items.length} ürün
        </PanelHeader>
        <PanelBody>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

        </PanelBody>
        <PanelFooter>
          <strong>Toplam: <Price>${totalPrice.toFixed(2)}</Price></strong>
          <Button>Checkout</Button>
        </PanelFooter>
      </Panel>
    </main>
  );
}
