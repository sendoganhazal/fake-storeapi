'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Badge } from 'primereact/badge';
import { useCart } from '../../context/CardContext';

const StyledHeader = styled.header`
  background-color: var(--gray-2, #E6ECFC);
  color: var(--text-primary, #001655);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;

  .logo {
    font-size: 1.75rem;
    font-weight: 700;
    text-decoration: none;
    color: inherit;
    transition: color 0.2s;

    &:hover {
      color: var(--primary-color, #3064E8);
    }
  }

  .cart-icon-container {
    position: relative;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  .pi-shopping-cart {
    font-size: 1.75rem;
    color: var(--primary-color-text, #ffffff);
  }

  .p-badge {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    background-color: var(--red-500, #ef4444); /* Kırmızı renkli rozet */
    color: white;
    font-size: 0.75rem;
    min-width: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Mobil uyumluluk */
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    .logo {
      font-size: 1.5rem;
    }
    .pi-shopping-cart {
      font-size: 1.5rem;
    }
    .p-badge {
      min-width: 1.2rem;
      height: 1.2rem;
      line-height: 1.2rem;
      font-size: 0.65rem;
      top: -0.4rem;
      right: -0.4rem;
    }
  }
`;

const Header: React.FC = () => {
  const { cartItemCount } = useCart();

  return (
    <StyledHeader>
      <Link href="/" passHref className="logo">
        Fake Store
      </Link>
      <div className="cart-icon-container">
        <i className="pi pi-shopping-cart"></i>
        {cartItemCount > 0 && <Badge value={cartItemCount} severity="danger"></Badge>}
      </div>
    </StyledHeader>
  );
};

export default Header;
