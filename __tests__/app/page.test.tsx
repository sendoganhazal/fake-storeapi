// __tests__/app/page.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from '@/app/page';
import { getProducts, getCategories } from '@/lib/api/product';
import ProductList from '@/components/organisms/ProductList';
import { useSearchParams } from 'next/navigation';


jest.mock('@/lib/api/product', () => ({
  getProducts: jest.fn(),
  getCategories: jest.fn(),
}));

jest.mock('@/components/organisms/ProductList', () => {
  return jest.fn((props) => (
    <div data-testid="mock-product-list">
      <span data-testid="product-list-products-count">{props.products.length}</span>
      <span data-testid="product-list-total-products">{props.totalProducts}</span>
      <span data-testid="product-list-categories-count">{props.initialCategories.length}</span>
      <span data-testid="product-list-loading">{props.loading.toString()}</span>
    </div>
  ));
});

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));


describe('HomePage (Server Component)', () => {
  const mockAllProducts = [
    { id: 1, title: 'Ürün A', price: 10, description: 'Açıklama A', category: 'electronics', image: 'imgA', rating: { rate: 4, count: 100 } },
    { id: 2, title: 'Ürün B', price: 20, description: 'Açıklama B', category: 'jewelery', image: 'imgB', rating: { rate: 3, count: 50 } },
    { id: 3, title: 'Ürün C', price: 30, description: 'Açıklama C', category: 'electronics', image: 'imgC', rating: { rate: 5, count: 200 } },
    { id: 4, title: 'Ürün D', price: 40, description: 'Açıklama D', category: 'clothing', image: 'imgD', rating: { rate: 2, count: 30 } },
    { id: 5, title: 'Ürün E', price: 50, description: 'Açıklama E', category: 'electronics', image: 'imgE', rating: { rate: 4.5, count: 150 } },
    { id: 6, title: 'Ürün F', price: 60, description: 'Açıklama F', category: 'clothing', image: 'imgF', rating: { rate: 3.8, count: 90 } },
  ];
  const mockCategories = ['all', 'electronics', 'jewelery', 'clothing'];

  beforeEach(() => {
    (getProducts as jest.Mock).mockClear();
    (getCategories as jest.Mock).mockClear();
    (ProductList as jest.Mock).mockClear();


    (getProducts as jest.Mock).mockResolvedValue(mockAllProducts);
    (getCategories as jest.Mock).mockResolvedValue(mockCategories);
  });


  it('renders ProductList with default props when no searchParams are provided', async () => {
    render(await HomePage({ searchParams: {} }));

    expect(getProducts).toHaveBeenCalledTimes(1);
    expect(getProducts).toHaveBeenCalledWith({ limit: 0 }); 

    expect(getCategories).toHaveBeenCalledTimes(1);


    await waitFor(() => {
      expect(ProductList).toHaveBeenCalledTimes(1);
      expect(ProductList).toHaveBeenCalledWith(
        expect.objectContaining({
          products: mockAllProducts.slice(0, 6),
          totalProducts: mockAllProducts.length,
          initialCategories: mockCategories,
          loading: false,
        }),
        {}
      );
    });
  });

  it('renders ProductList with correct pagination based on searchParams', async () => {
    const searchParams = { limit: '2', offset: '2' }; 
    render(await HomePage({ searchParams }));

    expect(getProducts).toHaveBeenCalledWith({ limit: 0 }); 

    await waitFor(() => {
      expect(ProductList).toHaveBeenCalledWith(
        expect.objectContaining({
          products: mockAllProducts.slice(2, 4), 
          totalProducts: mockAllProducts.length,
          loading: false,
        }),
        {}
      );
    });
  });

  it('filters products by search param', async () => {
    const searchParams = { search: 'ürün A' };
    render(await HomePage({ searchParams }));

    await waitFor(() => {
      expect(ProductList).toHaveBeenCalledWith(
        expect.objectContaining({
          products: [mockAllProducts[0]],
          totalProducts: 1,
        }),
        {}
      );
    });
  });

  it('filters products by category param', async () => {
    const searchParams = { category: 'electronics' };
    render(await HomePage({ searchParams }));

    await waitFor(() => {
      expect(ProductList).toHaveBeenCalledWith(
        expect.objectContaining({
          products: [mockAllProducts[0], mockAllProducts[2], mockAllProducts[4]],
          totalProducts: 3,
        }),
        {}
      );
    });
  });

  it('filters products by price range params', async () => {
    const searchParams = { minPrice: '25', maxPrice: '45' };
    render(await HomePage({ searchParams }));

    await waitFor(() => {
      expect(ProductList).toHaveBeenCalledWith(
        expect.objectContaining({
          products: [mockAllProducts[2], mockAllProducts[3]],
          totalProducts: 2,
        }),
        {}
      );
    });
  });

  it('sorts products by price in descending order', async () => {
    const searchParams = { sort: 'desc' };
    render(await HomePage({ searchParams }));

    await waitFor(() => {
      expect(ProductList).toHaveBeenCalledWith(
        expect.objectContaining({
          products: [
            mockAllProducts[5],
            mockAllProducts[4],
            mockAllProducts[3],
            mockAllProducts[2],
            mockAllProducts[1],
            mockAllProducts[0], 
          ],
          totalProducts: mockAllProducts.length,
        }),
        {}
      );
    });
  });

  it('applies multiple filters correctly', async () => {
    const searchParams = { category: 'electronics', minPrice: '25', sort: 'desc' };
    render(await HomePage({ searchParams }));

    await waitFor(() => {
      expect(ProductList).toHaveBeenCalledWith(
        expect.objectContaining({
          products: [mockAllProducts[4], mockAllProducts[2]],
          totalProducts: 2,
        }),
        {}
      );
    });
  });
});
