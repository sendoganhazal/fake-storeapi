'use client';

import React from 'react';
import { Slider as PrimeSlider, SliderProps } from 'primereact/slider';

const Slider: React.FC<SliderProps> = ({ className, ...props }) => {
  return <PrimeSlider className={`p-slider ${className || ''}`} {...props} />;
};

export default Slider;
