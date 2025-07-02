// components/atoms/Button.tsx
'use client';

import React from 'react';
import { Button as PrimeButton, ButtonProps } from 'primereact/button';

interface CustomButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'; 
}

const Button: React.FC<CustomButtonProps> = ({ className, ...props }) => {

  return <PrimeButton className={`p-button ${className || ''}`} {...props} />;
};

export default Button;
