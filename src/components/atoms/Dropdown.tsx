'use client';

import React from 'react';
import { Dropdown as PrimeDropdown, DropdownProps } from 'primereact/dropdown';

const Dropdown: React.FC<DropdownProps> = ({ className, ...props }) => {
  return <PrimeDropdown className={`p-dropdown ${className || ''}`} {...props} />;
};

export default Dropdown;
