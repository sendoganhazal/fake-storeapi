'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from 'primereact/badge';
import { useCart } from '../../context/CardContext';
import CartOverlay from '../organisms/CartOverlay'

const Header: React.FC = () => {
  const { cartItemCount } = useCart();
  const [isCartOverlayOpen, setIsCartOverlayOpen] = useState(false);

  const toggleCartOverlay = () => {
    setIsCartOverlayOpen(prevState => !prevState);
  };

  return (
    <header className="header">
      <Link href="/" passHref className="logo">
        Fake Store
      </Link>
      <div className="cart-icon-container" aria-label="Sepet" onClick={toggleCartOverlay}>
        <i className="pi pi-shopping-cart"></i>
        {cartItemCount > 0 && <Badge value={cartItemCount} severity="danger"></Badge>}
      </div>

      {isCartOverlayOpen && <CartOverlay onClose={toggleCartOverlay} />}
    </header>
  );
};

export default Header;
