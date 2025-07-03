import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputText from '@/components/atoms/InputText';
import { InputText as PrimeInputText } from 'primereact/inputtext';

jest.mock('primereact/inputtext', () => ({
  InputText: jest.fn((props) => {
    const { className, ...rest } = props;
    return (
      <input
        type="text"
        data-testid="mock-inputtext"
        className={`p-inputtext ${className || ''}`}
        {...rest}
      />
    );
  }),
}));

describe('InputText', () => {
  it('renders with a placeholder', () => {
    render(<InputText placeholder="Arama yap..." />);
    const inputElement = screen.getByPlaceholderText(/arama yap.../i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('updates value on change', () => {
    render(<InputText data-testid="test-input" />);
    const inputElement = screen.getByTestId('test-input') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'Yeni Değer' } });
    expect(inputElement.value).toBe('Yeni Değer');
  });

  it('applies additional className', () => {
    render(<InputText className="custom-input" data-testid="test-input" />);
    const inputElement = screen.getByTestId('test-input');
    expect(inputElement).toHaveClass('p-inputtext');
    expect(inputElement).toHaveClass('custom-input');
  });

  it('forwards other HTML input props', () => {
    render(<InputText readOnly name="testName" id="testId" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('readOnly');
    expect(inputElement).toHaveAttribute('name', 'testName');
    expect(inputElement).toHaveAttribute('id', 'testId');
  });

  it('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    render(<InputText onFocus={handleFocus} onBlur={handleBlur} data-testid="test-input" />);
    const inputElement = screen.getByTestId('test-input');

    fireEvent.focus(inputElement);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(inputElement);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});
