'use client';

import React from 'react';
import { InputText as PrimeInputText, InputTextProps } from 'primereact/inputtext';



const InputText: React.FC<InputTextProps> = ({ className, ...props }) => {
  return <PrimeInputText className={`p-inputtext ${className || ''}`} {...props} />;
};

export default InputText;
