import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CartOverlay from '@/components/organisms/CartOverlay';
import { useCart } from '@/context/CardContext';
import ProductImage from '@/components/atoms/ProductImage';
import Link from 'next/link';


jest.mock('@/context/CartContext', () => ({
  useCart: jest.fn(),
}));

jest.mock('@/components/atoms/ProductImage', () => {
  return jest.fn((props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img data-testid="mock-product-image" src={props.src} alt={props.alt} />;
  });
});


jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('CartOverlay', () => {
  const mockOnClose = jest.fn();
  const mockAddToCart = jest.fn();
  const mockRemoveFromCart = jest.fn();
  const mockClearCart = jest.fn();

  const mockCartItems = [
    { id: 1, title: 'Ürün 1', price: 100, quantity: 2, image: '/product1.jpg', description: '', category: '', rating: { rate: 0, count: 0 } },
    { id: 2, title: 'Ürün 2', price: 50, quantity: 1, image: '/product2.jpg', description: '', category: '', rating: { rate: 0, count: 0 } },
  ];

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: mockCartItems,
      cartItemCount: 3, // 2 + 1
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart,
    });
    mockOnClose.mockClear();
    mockAddToCart.mockClear();
    mockRemoveFromCart.mockClear();
    mockClearCart.mockClear();
  });

  it('renders the cart overlay when isOpen is true', () => {
    render(<CartOverlay isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText(/sepetim/i)).toBeInTheDocument();
    expect(screen.getByText('Ürün 1')).toBeInTheDocument();
    expect(screen.getByText('Ürün 2')).toBeInTheDocument();
  });

  it('does not render the cart overlay when isOpen is false', () => {
    render(<CartOverlay isOpen={false} onClose={mockOnClose} />);
    expect(screen.queryByText(/sepetim/i)).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<CartOverlay isOpen={true} onClose={mockOnClose} />);
    const closeButton = screen.getByRole('button', { name: /kapatma ikonu/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('displays "Sepetiniz boş" message when cart is empty', () => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [],
      cartItemCount: 0,
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart,
    });
    render(<CartOverlay isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText(/sepetiniz boş./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /alışverişe başla/i })).toBeInTheDocument();
  });

  it('calls addToCart when plus button is clicked', () => {
    render(<CartOverlay isOpen={true} onClose={mockOnClose} />);
    const plusButton = screen.getAllByRole('button', { name: /pi pi-plus/i })[0];
    fireEvent.click(plusButton);
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockCartItems[0]);
  });

  it('calls removeFromCart when minus button is clicked', () => {
    render(<CartOverlay isOpen={true} onClose={mockOnClose} />);
    const minusButton = screen.getAllByRole('button', { name: /pi pi-minus/i })[0];
    fireEvent.click(minusButton);
    expect(mockRemoveFromCart).toHaveBeenCalledTimes(1);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockCartItems[0].id);
  });

  it('calls removeFromCart when remove button is clicked', () => {
    render(<CartOverlay isOpen={true} onClose={mockOnClose} />);
    const removeButton = screen.getAllByRole('button', { name: /kaldırma ikonu/i })[0];
    fireEvent.click(removeButton);
    expect(mockRemoveFromCart).toHaveBeenCalledTimes(1);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockCartItems[0].id);
  });

  it('calls clearCart when "Sepeti Temizle" button is clicked', () => {
    render(<CartOverlay isOpen={true} onClose={mockOnClose} />);
    const clearCartButton = screen.getByRole('button', { name: /sepeti temizle/i });
    fireEvent.click(clearCartButton);
    expect(mockClearCart).toHaveBeenCalledTimes(1);
  });

  it('displays correct total amount', () => {
    render(<CartOverlay isOpen={true} onClose={mockOnClose} />);
    const expectedTotal = (100 * 2) + (50 * 1); 
    expect(screen.getByText(`$${expectedTotal.toFixed(2)}`)).toBeInTheDocument();
  });

  it('calls onClose when clicked outside the overlay content', async () => {
    render(<CartOverlay isOpen={true} onClose={mockOnClose} />);
    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });
});
