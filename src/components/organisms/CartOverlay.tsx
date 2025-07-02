// components/organisms/CartOverlay.tsx
'use client';

import React from 'react';
import { useCart } from '../../context/CardContext';
import Button from '@/components/atoms/Button';
import ProductImage from '@/components/atoms/ProductImage';
import Link from 'next/link';

interface CartOverlayProps {
  onClose: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ onClose }) => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, cartItemCount } = useCart();

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-overlay-backdrop" onClick={onClose}>
      <div className="cart-overlay-content" onClick={(e) => e.stopPropagation()}> {/* Tıklama olayını yayılmasını engelle */}
        <div className="cart-overlay-header">
          <h2 className="cart-overlay-title">Sepetim ({cartItemCount})</h2>
          <Button
            icon="pi pi-times"
            className="p-button-text p-button-plain close-button"
            onClick={onClose}
            aria-label="Sepeti kapat"
          />
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-overlay-empty-message">
            <p>Sepetiniz boş.</p>
            <Link href="/" passHref>
              <Button label="Alışverişe Başla" className="p-button-primary" onClick={onClose} />
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-overlay-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-overlay-item">
                  <Link href={`/product/${item.id}`} passHref onClick={onClose}>
                    <ProductImage src={item.image} alt={item.title} className="cart-overlay-item-image" width={60} height={60} />
                  </Link>
                  <div className="cart-overlay-item-info">
                    <Link href={`/product/${item.id}`} passHref onClick={onClose}>
                      <span className="cart-overlay-item-title">{item.title}</span>
                    </Link>
                    <span className="cart-overlay-item-price">${item.price.toFixed(2)}</span>
                    <div className="cart-overlay-item-quantity-controls">
                      <Button
                        icon="pi pi-minus"
                        className="p-button-secondary p-button-sm p-button-outlined quantity-button"
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label="Miktarı azalt"
                      />
                      <span className="quantity-display">{item.quantity}</span>
                      <Button
                        icon="pi pi-plus"
                        className="p-button-secondary p-button-sm p-button-outlined quantity-button"
                        onClick={() => increaseQuantity(item.id)}
                        aria-label="Miktarı artır"
                      />
                    </div>
                  </div>
                  <Button
                    icon="pi pi-trash"
                    className="p-button-danger p-button-sm p-button-text remove-button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Ürünü sepetten kaldır"
                  />
                </div>
              ))}
            </div>

            <div className="cart-overlay-summary">
              <div className="summary-row">
                <span>Toplam Tutar:</span>
                <span className="total-amount-display">${totalAmount.toFixed(2)}</span>
              </div>
              <Link href="/cart" passHref>
                <Button label="Sepete Git" className="p-button-primary go-to-cart-button" onClick={onClose} />
              </Link>
              <Button label="Sepeti Temizle" className="p-button-secondary clear-cart-button" onClick={clearCart} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartOverlay;
