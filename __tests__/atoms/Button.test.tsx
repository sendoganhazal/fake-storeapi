import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/atoms/Button';
import { Button as PrimeButton } from 'primereact/button';
const mockPrimeButton = jest.fn((props) => {
  const { label, icon, className, children, disabled, ...rest } = props;
  return (
    <button
      data-testid="mock-button" 
      className={`p-button ${className || ''}`}
      disabled={disabled}
      {...rest}
    >
      {icon && <i className={`${icon} p-button-icon`}></i>} {/* PrimeIcons sınıfını kullan */}
      {label && <span className="p-button-label">{label}</span>}
      {children}
    </button>
  );
});

jest.mock('primereact/button', () => ({
  Button: mockPrimeButton,
}));

jest.mock('@/components/atoms/StyledButton', () => ({
  __esModule: true,
  default: jest.fn((props) => {
    return mockPrimeButton(props);
  }),
}));


describe('Button', () => {
  beforeEach(() => {
    mockPrimeButton.mockClear();
  });

  it('renders with a label', () => {
    render(<Button label="Test Butonu" />);
    expect(screen.getByRole('button', { name: /test butonu/i })).toBeInTheDocument();
    expect(mockPrimeButton).toHaveBeenCalledWith(
      expect.objectContaining({ label: 'Test Butonu' }),
      {}
    );
  });
  it('renders with an icon class', () => {
    render(<Button icon="pi pi-shopping-cart" label="İkonlu Buton" />);
    const buttonElement = screen.getByRole('button', { name: /ikonlu buton/i });
    expect(buttonElement).toBeInTheDocument(); 
    const iconElement = buttonElement.querySelector('.pi-shopping-cart');
    expect(iconElement).toBeInTheDocument();

    expect(mockPrimeButton).toHaveBeenCalledWith(
      expect.objectContaining({ icon: 'pi pi-shopping-cart', label: 'İkonlu Buton' }),
      {}
    );
  });

  it('renders with children', () => {
    render(<Button><span data-testid="child-content">Çocuk İçerik</span></Button>);
    const buttonElement = screen.getByRole('button');
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(buttonElement).toContainElement(screen.getByTestId('child-content'));
    expect(mockPrimeButton).toHaveBeenCalledWith(
      expect.objectContaining({
        children: <span data-testid="child-content">Çocuk İçerik</span>,
      }),
      {}
    );
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Tıkla Bana" onClick={handleClick} />);
    const buttonElement = screen.getByRole('button', { name: /tıkla bana/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(mockPrimeButton).toHaveBeenCalledWith(
      expect.objectContaining({ onClick: handleClick }),
      {}
    );
  });

  it('applies variant classes correctly', () => {
    render(<Button label="Primary" variant="primary" />);
    expect(mockPrimeButton).toHaveBeenCalledWith(
      expect.objectContaining({ className: 'button-primary' }),
      {}
    );
    mockPrimeButton.mockClear();

    render(<Button label="Secondary" variant="secondary" />);
    expect(mockPrimeButton).toHaveBeenCalledWith(
      expect.objectContaining({ className: 'button-secondary' }),
      {}
    );
    mockPrimeButton.mockClear();

    render(<Button label="Danger" variant="danger" />);
    expect(mockPrimeButton).toHaveBeenCalledWith(
      expect.objectContaining({ className: 'button-danger' }),
      {}
    );
    mockPrimeButton.mockClear();

    render(<Button label="Text" variant="text" />);
    expect(mockPrimeButton).toHaveBeenCalledWith(
      expect.objectContaining({ className: 'button-text' }),
      {}
    );
    mockPrimeButton.mockClear();

    render(<Button label="Outlined Secondary" variant="outlined-secondary" />);
    expect(mockPrimeButton).toHaveBeenCalledWith(
      expect.objectContaining({ className: 'button-outlined button-secondary' }),
      {}
    );
  });
  it('applies size classes correctly', () => {
    render(<Button label="Small" size="sm" />);
    expect(mockPrimeButton).toHaveBeenCalledWith(
      expect.objectContaining({ className: 'button-sm' }),
      {}
    );
    mockPrimeButton.mockClear();

    render(<Button label="Medium" size="md" />);
    expect(mockPrimeButton).toHaveBeenCalledWith(
      expect.objectContaining({ className: 'button-md' }),
      {}
    );
    mockPrimeButton.mockClear();

    render(<Button label="Large" size="lg" />);
    expect(mockPrimeButton).toHaveBeenCalledWith(
      expect.objectContaining({ className: 'button-lg' }),
      {}
    );
  });
  it('is disabled when disabled prop is true', () => {
    const handleClick = jest.fn();
    render(<Button label="Devre Dışı Buton" onClick={handleClick} disabled />);
    const buttonElement = screen.getByRole('button', { name: /devre dışı buton/i });
    expect(buttonElement).toBeDisabled();
    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
    expect(mockPrimeButton).toHaveBeenCalledWith(
      expect.objectContaining({ disabled: true }),
      {}
    );
  });
});
