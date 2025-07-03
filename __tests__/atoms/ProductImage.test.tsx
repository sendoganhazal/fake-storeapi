import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductImage from '@/components/atoms/ProductImage';
import Image from 'next/image';
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { priority, ...restProps } = props;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...restProps}
        {...(priority && { priority: 'true' })} 
      />
    );
  },
}));

describe('ProductImage', () => {
  const mockSrc = '/test-image.jpg';
  const mockAlt = 'Test Ürünü Görseli';

  it('renders with correct src and alt attributes', () => {
    render(<ProductImage src={mockSrc} alt={mockAlt} />);
    const imageElement = screen.getByAltText(mockAlt);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockSrc);
  });

  it('applies default width and height if not provided', () => {
    render(<ProductImage src={mockSrc} alt={mockAlt} />);
    const imageElement = screen.getByAltText(mockAlt);
    expect(imageElement).toHaveAttribute('width', '200');
    expect(imageElement).toHaveAttribute('height', '200');
  });

 
  it('applies provided width and height', () => {
    render(<ProductImage src={mockSrc} alt={mockAlt} width={150} height={150} />);
    const imageElement = screen.getByAltText(mockAlt);
    expect(imageElement).toHaveAttribute('width', '150');
    expect(imageElement).toHaveAttribute('height', '150');
  });

  it('applies additional className', () => {
    render(<ProductImage src={mockSrc} alt={mockAlt} className="custom-class" />);
    const imageElement = screen.getByAltText(mockAlt);
    expect(imageElement.parentElement).toHaveClass('product-image-wrapper');
    expect(imageElement.parentElement).toHaveClass('custom-class');
  });


  it('applies priority prop', () => {
    render(<ProductImage src={mockSrc} alt={mockAlt} priority />);
    const imageElement = screen.getByAltText(mockAlt);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('priority', 'true');
  });

  it('displays placeholder image on error', () => {
    render(<ProductImage src={mockSrc} alt={mockAlt} />);
    const imageElement = screen.getByAltText(mockAlt) as HTMLImageElement;

    fireEvent.error(imageElement);
    expect(imageElement.src).toContain('https://placehold.co/');
    expect(imageElement.src).toContain('text=G%C3%B6rsel+Yok');
  });
});
