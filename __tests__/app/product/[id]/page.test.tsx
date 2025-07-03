import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProductDetailPage, { generateMetadata } from '@/app/product/[id]/page';
import { getProductById } from '@/lib/api/product';
import ProductDetailDisplay from '@/components/organisms/ProductDetailDisplay';
import { notFound } from 'next/navigation';


jest.mock('@/lib/api/product', () => ({
  getProductById: jest.fn(),
}));

jest.mock('@/components/organisms/ProductDetailDisplay', () => {
  return jest.fn((props) => (
    <div data-testid="mock-product-detail-display">
      <h1 data-testid="product-detail-title">{props.product.title}</h1>
      <span data-testid="product-detail-price">{props.product.price}</span>
    </div>
  ));
});

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

describe('ProductDetailPage (Server Component)', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Ürünü Detay',
    price: 150.00,
    description: 'Bu bir test ürünü detay açıklamasıdır.',
    category: 'electronics',
    image: 'test-detail-image.jpg',
    rating: { rate: 4.8, count: 300 },
  };

  beforeEach(() => {
    (getProductById as jest.Mock).mockClear();
    (ProductDetailDisplay as jest.Mock).mockClear();
    (notFound as jest.Mock).mockClear();
  });

  it('renders ProductDetailDisplay with product data when product is found', async () => {
    (getProductById as jest.Mock).mockResolvedValue(mockProduct);

    render(await ProductDetailPage({ params: { id: '1' } }));

    await waitFor(() => {
      expect(getProductById).toHaveBeenCalledTimes(1);
      expect(getProductById).toHaveBeenCalledWith('1');
      expect(ProductDetailDisplay).toHaveBeenCalledTimes(1);
      expect(ProductDetailDisplay).toHaveBeenCalledWith(
        expect.objectContaining({
          product: mockProduct,
        }),
        {}
      );
      expect(screen.getByTestId('product-detail-title')).toHaveTextContent(mockProduct.title);
      expect(screen.getByTestId('product-detail-price')).toHaveTextContent(mockProduct.price.toString());
    });
  });

  it('calls notFound when product is not found', async () => {
    (getProductById as jest.Mock).mockResolvedValue(null);
    await expect(ProductDetailPage({ params: { id: '999' } })).rejects.toThrow();

    await waitFor(() => {
      expect(getProductById).toHaveBeenCalledTimes(1);
      expect(getProductById).toHaveBeenCalledWith('999');
      expect(notFound).toHaveBeenCalledTimes(1);
      expect(ProductDetailDisplay).not.toHaveBeenCalled();
    });
  });

  it('calls notFound when getProductById API call fails', async () => {
    (getProductById as jest.Mock).mockRejectedValue(new Error('API Hatası'));

    await expect(ProductDetailPage({ params: { id: '123' } })).rejects.toThrow();

    await waitFor(() => {
      expect(getProductById).toHaveBeenCalledTimes(1);
      expect(getProductById).toHaveBeenCalledWith('123');
      expect(notFound).toHaveBeenCalledTimes(1);
      expect(ProductDetailDisplay).not.toHaveBeenCalled();
    });
  });

  it('generateMetadata returns correct metadata when product is found', async () => {
    (getProductById as jest.Mock).mockResolvedValue(mockProduct);

    const metadata = await generateMetadata({ params: { id: '1' } });

    expect(metadata.title).toBe(mockProduct.title);
    expect(metadata.description).toBe(mockProduct.description);
    expect(metadata.openGraph?.title).toBe(mockProduct.title);
    expect(metadata.openGraph?.description).toBe(mockProduct.description);
    expect(metadata.openGraph?.images).toEqual([{ url: mockProduct.image }]);
    expect(metadata.twitter?.title).toBe(mockProduct.title);
    expect(metadata.twitter?.description).toBe(mockProduct.description);
    expect(metadata.twitter?.images).toEqual([mockProduct.image]);
  });

  it('generateMetadata returns default metadata when product is not found', async () => {
    (getProductById as jest.Mock).mockResolvedValue(null);

    const metadata = await generateMetadata({ params: { id: '999' } });

    expect(metadata.title).toBe('Ürün Bulunamadı');
    expect(metadata.description).toBe('Aradığınız ürün bulunamadı.');
    expect(metadata.openGraph).toBeUndefined();
    expect(metadata.twitter).toBeUndefined();
  });
});
