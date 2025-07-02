'use client';

import React from 'react';
import Link from 'next/link';
import { Badge } from 'primereact/badge';
import { useCart } from '../../context/CardContext';


const Header: React.FC = () => {
  const { cartItemCount } = useCart();

  return (
    <header className="header">
      <Link href="/" passHref className="logo">
        Fake Store
      </Link>
      <div className="cart-icon-container">
        <i className="pi pi-shopping-cart"></i>
        {cartItemCount > 0 && <Badge value={cartItemCount} severity="danger"></Badge>}
      </div>
    </header>
  );
};

export default Header;
