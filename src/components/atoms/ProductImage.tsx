'use client';

import React from 'react';
import Image from 'next/image';

interface ProductImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string; // Ekstra sınıf prop'u
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt, width = 200, height = 200, priority = false, className }) => {
  return (
    <div className={`product-image-wrapper ${className || ''}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        onError={(e) => {
          e.currentTarget.src = 'https://placehold.co/200x200/cccccc/000000?text=Görsel+Yok';
        }}
      />
    </div>
  );
};

export default ProductImage;
