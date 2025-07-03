import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductList from '@/components/organisms/ProductList';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Paginator } from 'primereact/paginator';
import ProductCard from '@/components/molecules/ProductCard';
import FilterControls from '@/components/molecules/FilterControls';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock('primereact/progressspinner', () => ({
  ProgressSpinner: jest.fn(() => <div data-testid="mock-spinner">Yükleniyor...</div>),
}));

jest.mock('primereact/paginator', () => ({
  Paginator: jest.fn((props) => {
    const { first, rows, totalRecords, onPageChange } = props;
    const currentPage = Math.floor(first / rows) + 1;
    const pageCount = Math.ceil(totalRecords / rows);

    const handleClick = (page: number) => {
      onPageChange({ first: (page - 1) * rows, rows, page, pageCount });
    };

    return (
      <nav data-testid="mock-paginator">
        <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => handleClick(page)}
            className={page === currentPage ? 'p-highlight' : ''}
          >
            {page}
          </button>
        ))}
        <button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === pageCount}>Next</button>
      </nav>
    );
  }),
}));

jest.mock('@/components/molecules/ProductCard', () => {
  return jest.fn(({ product }) => (
    <div data-testid={`mock-product-card-${product.id}`}>
      {product.title} - ${product.price}
    </div>
  ));
});

jest.mock('@/components/molecules/FilterControls', () => {
  return jest.fn(() => <div data-testid="mock-filter-controls">Filtre Kontrolleri</div>);
});


describe('ProductList', () => {
  const mockProducts = [
    { id: 1, title: 'Ürün A', price: 10, description: '', category: '', image: '', rating: { rate: 0, count: 0 } },
    { id: 2, title: 'Ürün B', price: 20, description: '', category: '', image: '', rating: { rate: 0, count: 0 } },
    { id: 3, title: 'Ürün C', price: 30, description: '', category: '', image: '', rating: { rate: 0, count: 0 } },
    { id: 4, title: 'Ürün D', price: 40, description: '', category: '', image: '', rating: { rate: 0, count: 0 } },
    { id: 5, title: 'Ürün E', price: 50, description: '', category: '', image: '', rating: { rate: 0, count: 0 } },
    { id: 6, title: 'Ürün F', price: 60, description: '', category: '', image: '', rating: { rate: 0, count: 0 } },
    { id: 7, title: 'Ürün G', price: 70, description: '', category: '', image: '', rating: { rate: 0, count: 0 } },
    { id: 8, title: 'Ürün H', price: 80, description: '', category: '', image: '', rating: { rate: 0, count: 0 } },
    { id: 9, title: 'Ürün I', price: 90, description: '', category: '', image: '', rating: { rate: 0, count: 0 } },
    { id: 10, title: 'Ürün J', price: 100, description: '', category: '', image: '', rating: { rate: 0, count: 0 } },
    { id: 11, title: 'Ürün K', price: 110, description: '', category: '', image: '', rating: { rate: 0, count: 0 } },
  ];
  const mockTotalProducts = mockProducts.length;
  const mockInitialCategories = ['all', 'electronics', 'jewelery'];
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (usePathname as jest.Mock).mockReturnValue('/');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    mockRouterPush.mockClear();
    (ProductCard as jest.Mock).mockClear();
    (FilterControls as jest.Mock).mockClear();
  });

  it('renders loading spinner when loading is true', () => {
    render(
      <ProductList
        products={[]}
        totalProducts={0}
        initialCategories={mockInitialCategories}
        loading={true}
      />
    );
    expect(screen.getByTestId('mock-spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-product-card-1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-paginator')).not.toBeInTheDocument();
  });

  it('renders product cards and pagination when loading is false and products exist', () => {
    render(
      <ProductList
        products={mockProducts.slice(0, 10)} 
        totalProducts={mockTotalProducts}
        initialCategories={mockInitialCategories}
        loading={false}
      />
    );
    expect(screen.queryByTestId('mock-spinner')).not.toBeInTheDocument();
    expect(screen.getByTestId('mock-product-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('mock-product-card-10')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-product-card-11')).not.toBeInTheDocument(); // 11. ürün ilk sayfada olmamalı
    expect(screen.getByTestId('mock-paginator')).toBeInTheDocument();
    expect(screen.getByTestId('mock-filter-controls')).toBeInTheDocument();
  });

  it('renders "No products found" message when no products exist', () => {
    render(
      <ProductList
        products={[]}
        totalProducts={0}
        initialCategories={mockInitialCategories}
        loading={false}
      />
    );
    expect(screen.queryByTestId('mock-spinner')).not.toBeInTheDocument();
    expect(screen.getByText(/gösterilecek ürün bulunamadı./i)).toBeInTheDocument();
    expect(screen.queryByTestId('mock-paginator')).not.toBeInTheDocument();
  });

  it('updates URL with new offset when page changes', () => {
    render(
      <ProductList
        products={mockProducts.slice(0, 10)}
        totalProducts={mockTotalProducts}
        initialCategories={mockInitialCategories}
        loading={false}
      />
    );


    fireEvent.click(screen.getByText('Next'));

    expect(mockRouterPush).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith('/?offset=10'); 
  });

  it('passes correct pagination props to Pagination component', () => {
    render(
      <ProductList
        products={mockProducts.slice(0, 10)}
        totalProducts={mockTotalProducts}
        initialCategories={mockInitialCategories}
        loading={false}
      />
    );

    expect(Paginator).toHaveBeenCalledWith(
      expect.objectContaining({
        first: 0,
        rows: 10,
        totalRecords: mockTotalProducts,
      }),
      {}
    );
  });
});
