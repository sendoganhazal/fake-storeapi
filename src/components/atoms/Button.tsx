'use client';

import React from 'react';
import { Button as PrimeButton, ButtonProps } from 'primereact/button';


const Button: React.FC<ButtonProps> = ({ className, ...props }) => {

  return <PrimeButton className={`p-button ${className || ''}`} {...props} />;
};

export default Button;
