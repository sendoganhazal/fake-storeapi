import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@/components/molecules/Pagination';
import { Paginator } from 'primereact/paginator';


jest.mock('primereact/paginator', () => ({
  Paginator: jest.fn((props) => {
    const { first, rows, totalRecords, onPageChange, template } = props;
    const currentPage = Math.floor(first / rows) + 1;
    const pageCount = Math.ceil(totalRecords / rows);

    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

    const handleClick = (page: number) => {
      onPageChange({ first: (page - 1) * rows, rows, page, pageCount });
    };

    return (
      <nav data-testid="mock-paginator">
      
        <button onClick={() => handleClick(1)} disabled={currentPage === 1}>First</button>
        <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        {pages.map(page => (
          <button
            key={page}
            onClick={() => handleClick(page)}
            className={page === currentPage ? 'p-highlight' : ''}
          >
            {page}
          </button>
        ))}
        <button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === pageCount}>Next</button>
        <button onClick={() => handleClick(pageCount)} disabled={currentPage === pageCount}>Last</button>
      </nav>
    );
  }),
}));

describe('Pagination', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });


  it('renders Paginator with correct props', () => {
    render(
      <Pagination
        first={0}
        rows={10}
        totalRecords={100}
        onPageChange={mockOnPageChange}
      />
    );
    const paginatorElement = screen.getByTestId('mock-paginator');
    expect(paginatorElement).toBeInTheDocument();

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Last')).toBeInTheDocument();
  });


  it('calls onPageChange with correct parameters when page is changed', () => {
    render(
      <Pagination
        first={0}
        rows={10}
        totalRecords={100}
        onPageChange={mockOnPageChange}
      />
    );

 
    fireEvent.click(screen.getByText('2'));

    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
    expect(mockOnPageChange).toHaveBeenCalledWith({
      first: 10,
      rows: 10,
      page: 2,
      pageCount: 10,
    });
  });

  
  it('calls onPageChange when "Next" button is clicked', () => {
    render(
      <Pagination
        first={0}
        rows={10}
        totalRecords={100}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText('Next'));

    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
    expect(mockOnPageChange).toHaveBeenCalledWith({
      first: 10,
      rows: 10,
      page: 2,
      pageCount: 10,
    });
  });

  it('calls onPageChange when "Last" button is clicked', () => {
    render(
      <Pagination
        first={0}
        rows={10}
        totalRecords={100}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText('Last'));

    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
    expect(mockOnPageChange).toHaveBeenCalledWith({
      first: 90,
      rows: 10,
      page: 10,
      pageCount: 10,
    });
  });

  it('disables "First" and "Prev" buttons on the first page', () => {
    render(
      <Pagination
        first={0}
        rows={10}
        totalRecords={100}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('First')).toBeDisabled();
    expect(screen.getByText('Prev')).toBeDisabled();
  });


  it('disables "Next" and "Last" buttons on the last page', () => {
    render(
      <Pagination
        first={90} 
        rows={10}
        totalRecords={100}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('Next')).toBeDisabled();
    expect(screen.getByText('Last')).toBeDisabled();
  });
});
