import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FilterControls from '@/components/molecules/FilterControls';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { getCategories } from '@/lib/api/product';
import { debounce } from 'lodash';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));


jest.mock('@/lib/api/product', () => ({
  getCategories: jest.fn(() => Promise.resolve(['electronics', 'jewelery'])),
}));


jest.mock('lodash', () => ({
  debounce: jest.fn((fn) => {
    const debouncedFn = jest.fn(fn);
    debouncedFn.cancel = jest.fn(); 
    return debouncedFn;
  }),
}));

describe('FilterControls', () => {
  const mockInitialCategories = ['all', 'electronics', 'jewelery'];
  const mockRouterPush = jest.fn();
  const mockDebounce = debounce as jest.Mock; 

  beforeEach(() => {

    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (usePathname as jest.Mock).mockReturnValue('/');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    mockRouterPush.mockClear();
    mockDebounce.mockClear();
    mockDebounce.mockImplementation((fn) => { 
      const debouncedFn = jest.fn((...args) => fn(...args));
      debouncedFn.cancel = jest.fn();
      return debouncedFn;
    });
  });


  it('renders search input, sort dropdown, category dropdown, slider, and reset button', async () => {
    render(<FilterControls initialCategories={mockInitialCategories} />);

    expect(screen.getByLabelText(/ürün ara/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sıralama/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/kategori/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fiyat aralığı/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filtreleri sıfırla/i })).toBeInTheDocument();
  });


  it('updates search param in URL with debounce', async () => {
    render(<FilterControls initialCategories={mockInitialCategories} />);
    const searchInput = screen.getByLabelText(/ürün ara/i);

    fireEvent.change(searchInput, { target: { value: 'laptop' } });

    expect(mockDebounce).toHaveBeenCalledTimes(1);
    const debouncedFn = mockDebounce.mock.results[0].value; 

    debouncedFn('laptop'); 

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledTimes(1);
      expect(mockRouterPush).toHaveBeenCalledWith('/?search=laptop');
    });
  });

  it('updates sort param in URL when sort order changes', () => {
    render(<FilterControls initialCategories={mockInitialCategories} />);
    const sortDropdown = screen.getByLabelText(/sıralama/i);

    fireEvent.change(sortDropdown, { target: { value: 'desc' } });

    expect(mockRouterPush).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith('/?sort=desc');
  });

  it('updates category param in URL when category changes', () => {
    render(<FilterControls initialCategories={mockInitialCategories} />);
    const categoryDropdown = screen.getByLabelText(/kategori/i);

    fireEvent.change(categoryDropdown, { target: { value: 'electronics' } });

    expect(mockRouterPush).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith('/?category=electronics');
  });


  it('removes category param when "all" category is selected', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('category=electronics'));
    render(<FilterControls initialCategories={mockInitialCategories} />);
    const categoryDropdown = screen.getByLabelText(/kategori/i);

    fireEvent.change(categoryDropdown, { target: { value: 'all' } });

    expect(mockRouterPush).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith('/'); 
  });

  it('updates price range params in URL when slider changes', () => {
    render(<FilterControls initialCategories={mockInitialCategories} />);
    const sliderInput = screen.getByLabelText(/fiyat aralığı/i);
    fireEvent.change(sliderInput, { target: { value: '500' } });

    expect(mockRouterPush).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith('/?minPrice=500&maxPrice=500');
  });

  it('resets all filters and clears URL params when reset button is clicked', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('search=test&sort=desc&category=electronics&minPrice=100&maxPrice=500'));
    render(<FilterControls initialCategories={mockInitialCategories} />);

    const resetButton = screen.getByRole('button', { name: /filtreleri sıfırla/i });
    fireEvent.click(resetButton);

    expect(mockRouterPush).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith('/');
  });
});
