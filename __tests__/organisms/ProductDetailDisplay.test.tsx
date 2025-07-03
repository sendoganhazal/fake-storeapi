import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetailDisplay from '@/components/organisms/ProductDetailDisplay';
import { useCart } from '@/context/CardContext';
import ProductImage from '@/components/atoms/ProductImage';
import { Rating } from 'primereact/rating';

jest.mock('@/context/CartContext', () => ({
  useCart: jest.fn(),
}));

jest.mock('@/components/atoms/ProductImage', () => {
  return jest.fn((props) => {
       // eslint-disable-next-line @next/next/no-img-element
    return <img data-testid="mock-product-image" src={props.src} alt={props.alt} />;
  });
});

jest.mock('primereact/rating', () => ({
  Rating: jest.fn((props) => (
    <div data-testid="mock-rating" aria-label={`Rating: ${props.value} stars`}>
      {'★'.repeat(Math.floor(props.value))}
    </div>
  )),
}));

describe('ProductDetailDisplay', () => {
  const mockProduct = {
    id: 1,
    title: 'Harika Bir Ürün',
    price: 129.99,
    description: 'Bu, ürünün detaylı açıklamasıdır. Özellikleri, faydaları ve kullanım alanları hakkında bilgi içerir.',
    category: 'elektronik',
    image: 'https://fakestoreapi.com/img/81QpkMpmcqL._AC_SL1500_.jpg',
    rating: { rate: 4.2, count: 250 },
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
    render(<ProductDetailDisplay product={mockProduct} />);

    expect(screen.getByRole('heading', { name: mockProduct.title })).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByLabelText(`Rating: ${mockProduct.rating.rate} stars`)).toBeInTheDocument();
    expect(screen.getByText(`(${mockProduct.rating.count} yorum)`)).toBeInTheDocument();
    expect(screen.getByTestId('mock-product-image')).toHaveAttribute('src', mockProduct.image);
  });


  it('calls addToCart when "Sepete Ekle" button is clicked', () => {
    render(<ProductDetailDisplay product={mockProduct} />);
    const addButton = screen.getByRole('button', { name: /sepete ekle/i });
    fireEvent.click(addButton);
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('renders ProductImage with priority prop', () => {
    render(<ProductDetailDisplay product={mockProduct} />);
    expect(ProductImage).toHaveBeenCalledWith(
      expect.objectContaining({
        src: mockProduct.image,
        alt: mockProduct.title,
        width: 400,
        height: 400,
        priority: true,
      }),
      {}
    );
  });
});
