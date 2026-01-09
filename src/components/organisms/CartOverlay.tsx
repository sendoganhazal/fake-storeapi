"use client";

import styled from "styled-components";
import Overlay from "@/components/atoms/Overlay";
import CartItem from "@/components/molecules/CartItem";
import Button from "@/components/atoms/Button";
import { useCart } from "@/lib/context/CartContext";
import { useUI } from "@/lib/context/UIContext";
import { useRouter } from "next/navigation";

const Drawer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 380px;
  height: 100vh;
  background: #fff;
  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "100%")});
  transition: 0.3s;
  z-index: 50;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Footer = styled.div`
  margin-top: auto;
  border-top: 1px solid #eee;
  padding-top: 12px;
`;

export default function CartOverlay() {
  const { items } = useCart();
  const { isCartOpen, closeCart } = useUI();
  const router = useRouter();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Overlay isOpen={isCartOpen} onClose={closeCart} />

      <Drawer $isOpen={isCartOpen}>
        <Header>
          <h2>Sepet</h2>
          <button onClick={closeCart}>✕</button>
        </Header>

        {items.length === 0 ? (
          <p>Sepet boş 🛒</p>
        ) : (
          items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))
        )}

        <Footer>
          <strong>Total: ${totalPrice.toFixed(2)}</strong>

          <Button
            disabled={items.length === 0}
            onClick={() => {
              closeCart();
              router.push("/cart");
            }}
          >
            Sepete Git
          </Button>
        </Footer>
      </Drawer>
    </>
  );
}
