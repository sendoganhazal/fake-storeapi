'use client';

import React from 'react';
import { useCart } from '@/utils/CardContext';
import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import {
  CloseOutlined,
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
  SettingOutlined,
  ProfileOutlined
} from '@ant-design/icons';
interface CartOverlayProps {
  onClose: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ onClose }) => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, cartItemCount } = useCart();

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-overlay-backdrop" onClick={onClose}>
      <div className="cart-overlay-content" onClick={(e) => e.stopPropagation()}>
        <div className="cart-overlay-header">
          <h2 className="cart-overlay-title">My Cart ({cartItemCount})</h2>
          <Button
            icon={<CloseOutlined />}
            className="close-button"
            onClick={onClose}
            aria-label="Sepeti kapat"
          />
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-overlay-empty-message">
            <p>Cart is Empty</p>
            <Link href="/" passHref>
              <Button type='primary' onClick={onClose}>Start to Shoping</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-overlay-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-overlay-item">
                  <Link href={`/product/${item.id}`} passHref onClick={onClose}>
                    <Image src={item.images[0]} alt={item.title} className="cart-overlay-item-image" width={60} height={60} />
                  </Link>
                  <div className="cart-overlay-item-info">
                    <Link href={`/product/${item.id}`} passHref onClick={onClose}>
                      <span className="cart-overlay-item-title">{item.title}</span>
                    </Link>
                    <span className="cart-overlay-item-price">${item.price.toFixed(2)}</span>
                    <div className="cart-overlay-item-quantity-controls">
                      <Button
                        icon={<MinusOutlined />}
                        color='cyan'
                        variant='solid'
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label="Miktarı azalt"
                      />
                      <span className="quantity-display">{item.quantity}</span>
                      <Button
                        icon={<PlusOutlined />}
                        color='cyan'
                        variant='solid'
                        onClick={() => increaseQuantity(item.id)}
                        aria-label="Miktarı artır"
                      />
                    </div>
                  </div>
                  <Button
                    icon={<DeleteOutlined />}
                    color='pink'
                    variant='outlined'
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
                <Button size='large' type='primary' onClick={onClose} className='go-to-cart-button'>Go to Cart</Button>
              </Link>
              <Button size='large' color='pink' variant='outlined' onClick={clearCart} className='clear-cart-button'>Clear Cart</Button>

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartOverlay;