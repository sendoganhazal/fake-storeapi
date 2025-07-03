import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '@/components/atoms/Dropdown';
import { Dropdown as PrimeDropdown } from 'primereact/dropdown'; 
jest.mock('primereact/dropdown', () => ({
  Dropdown: jest.fn((props) => {
    const { options, value, onChange, placeholder, ...rest } = props;
    return (
      <select
        data-testid="mock-dropdown"
        value={value}
        onChange={(e) => onChange({ value: e.target.value })} 
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }),
}));


describe('Dropdown', () => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  it('renders with options and a placeholder', () => {
    render(
      <Dropdown
        options={options}
        value=""
        onChange={jest.fn()}
        placeholder="Seçim Yap"
      />
    );
    const dropdownElement = screen.getByTestId('mock-dropdown');
    expect(dropdownElement).toBeInTheDocument();
    expect(screen.getByText('Seçim Yap')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });
  it('calls onChange with the correct value when an option is selected', () => {
    const handleChange = jest.fn();
    render(
      <Dropdown
        options={options}
        value="1"
        onChange={handleChange}
      />
    );
    const dropdownElement = screen.getByTestId('mock-dropdown');
    fireEvent.change(dropdownElement, { target: { value: '2' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({ value: '2' });
  });
  it('displays the correct initial value', () => {
    render(
      <Dropdown
        options={options}
        value="2"
        onChange={jest.fn()}
      />
    );
    const dropdownElement = screen.getByTestId('mock-dropdown') as HTMLSelectElement;
    expect(dropdownElement.value).toBe('2');
  });

  it('applies additional className', () => {
    render(
      <Dropdown
        options={options}
        value="1"
        onChange={jest.fn()}
        className="custom-dropdown"
      />
    );
    const dropdownElement = screen.getByTestId('mock-dropdown');
    expect(dropdownElement).toHaveClass('custom-dropdown');
  });
});
