import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '@/components/molecules/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { Rating } from 'primereact/rating';
import { Card } from 'primereact/card';
import Link from 'next/link'; 
import ProductImage from '@/components/atoms/ProductImage';


jest.mock('@/contexts/CartContext', () => ({
  useCart: jest.fn(),
}));


jest.mock('primereact/rating', () => ({
  Rating: jest.fn((props) => (
    <div data-testid="mock-rating" aria-label={`Rating: ${props.value} stars`}>

      {'★'.repeat(Math.floor(props.value))}
    </div>
  )),
}));


jest.mock('primereact/card', () => ({
  Card: jest.fn(({ header, children, className }) => (
    <div data-testid="mock-card" className={className}>
      {header}
      <div className="p-card-body">
        <div className="p-card-content">
          {children}
        </div>
      </div>
    </div>
  )),
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});


jest.mock('@/components/atoms/ProductImage', () => {
  return jest.fn((props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img data-testid="mock-product-image" src={props.src} alt={props.alt} />;
  });
});

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Ürünü',
    price: 99.99,
    description: 'Bu bir test ürünüdür.',
    category: 'elektronik',
    image: 'https://fakestoreapi.com/img/81QpkMpmcqL._AC_SL1500_.jpg',
    rating: { rate: 4.5, count: 120 },
  };

  const mockAddToCart = jest.fn();

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [],
      cartItemCount: 0,
      addToCart: mockAddToCart,
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
    });
    mockAddToCart.mockClear();
  });
  it('renders product details correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByLabelText(`Rating: ${mockProduct.rating.rate} stars`)).toBeInTheDocument();
    expect(screen.getByText(`(${mockProduct.rating.count} yorum)`)).toBeInTheDocument();
    expect(screen.getByTestId('mock-product-image')).toHaveAttribute('src', mockProduct.image);
  });

  it('calls addToCart when "Sepete Ekle" button is clicked', () => {
    render(<ProductCard product={mockProduct} />);
    const addButton = screen.getByRole('button', { name: /sepete ekle/i });
    fireEvent.click(addButton);
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
  it('navigates to product detail page when product title is clicked', () => {
    render(<ProductCard product={mockProduct} />);
    const productTitleLink = screen.getByRole('link', { name: mockProduct.title });
    expect(productTitleLink).toHaveAttribute('href', `/product/${mockProduct.id}`);
  });

  it('product image link has correct href', () => {
    render(<ProductCard product={mockProduct} />);
    const imageLink = screen.getByTestId('mock-product-image').closest('a');
    expect(imageLink).toHaveAttribute('href', `/product/${mockProduct.id}`);
  });
});
