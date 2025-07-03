import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '@/components/molecules/Header';
import { useCart } from '@/context/CardContext';
import Link from 'next/link';
import { Badge } from 'primereact/badge';
import CartOverlay from '@/components/organisms/CartOverlay';

// useCart hook'unu mock'la
jest.mock('@/context/CartContext', () => ({
  useCart: jest.fn(),
}));

// Next.js Link bileşenini mock'la
jest.mock('next/link', () => {
  return ({ children, href, passHref, className, ...rest }: { children: React.ReactNode; href: string; passHref?: boolean; className?: string; [key: string]: any }) => {
    // Link'i bir <a> etiketi olarak render et
    return <a href={href} className={className} {...rest}>{children}</a>;
  };
});


jest.mock('primereact/badge', () => ({
  Badge: jest.fn((props) => {
    const { value, severity } = props;
    return (
      <span data-testid="mock-badge" className={`p-badge p-badge-${severity}`}>
        {value}
      </span>
    );
  }),
}));

jest.mock('@/components/organisms/CartOverlay', () => {
  return jest.fn((props) => (
    <div data-testid="mock-cart-overlay" style={{ display: props.isOpen ? 'block' : 'none' }}>
      Mock Cart Overlay
      <button onClick={props.onClose}>Kapat</button>
    </div>
  ));
});


describe('Header', () => {
  const mockToggleCartOverlay = jest.fn();

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      cartItemCount: 0,
      cartItems: [],
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
      increaseQuantity: jest.fn(),
      decreaseQuantity: jest.fn(),
    });
    (CartOverlay as jest.Mock).mockClear();
    mockToggleCartOverlay.mockClear();
  });

  it('renders the logo and cart icon', () => {
    render(<Header />);
    expect(screen.getByText(/fake store/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /fake store/i })).toHaveAttribute('href', '/');
    expect(screen.getByLabelText('Sepet')).toBeInTheDocument();
    expect(screen.getByLabelText('Sepet').querySelector('.pi-shopping-cart')).toBeInTheDocument();
  });

  it('does not display badge when cart is empty', () => {
    render(<Header />);
    expect(screen.queryByTestId('mock-badge')).not.toBeInTheDocument();
  });

  it('displays correct cart item count in badge when cart has items', () => {
    (useCart as jest.Mock).mockReturnValue({
      cartItemCount: 5,
      cartItems: [{ id: 1, quantity: 5 } as any],
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
      increaseQuantity: jest.fn(),
      decreaseQuantity: jest.fn(),
    });
    render(<Header />);
    expect(screen.getByTestId('mock-badge')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
  it('opens CartOverlay when cart icon is clicked', () => {
    render(<Header />);
    const cartIconContainer = screen.getByLabelText('Sepet');
    fireEvent.click(cartIconContainer);
    expect(CartOverlay).toHaveBeenCalledTimes(1);
    expect(CartOverlay).toHaveBeenCalledWith(
      expect.objectContaining({ isOpen: true }),
      {}
    );
    expect(screen.getByTestId('mock-cart-overlay')).toBeInTheDocument();
  });

  it('closes CartOverlay when its close button is clicked', () => {
    render(<Header />);
    const cartIconContainer = screen.getByLabelText('Sepet');
    fireEvent.click(cartIconContainer); 

    const closeButton = screen.getByText('Kapat'); 
    fireEvent.click(closeButton);

    expect(CartOverlay).toHaveBeenCalledWith(
      expect.objectContaining({ isOpen: false }),
      {}
    );
    expect(screen.getByTestId('mock-cart-overlay')).toHaveStyle('display: none');
  });
});
