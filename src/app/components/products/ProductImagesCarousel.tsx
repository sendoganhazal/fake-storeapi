import React from 'react'
import { Carousel } from 'antd';
import Image from 'next/image'


interface ImagesProps {
    images: string[] | undefined
}

const ProductImagesCarousel: React.FC<ImagesProps> = ({ images }) => {
    return (
        <section>
            <Carousel arrows>
                {
                    images?.map((img, key) => (
                        <div key={key} className='carousel-image'>
                            <Image alt="product images" src={img} width={100} height={100} />
                        </div>
                    ))
                }
            </Carousel>
        </section>
    )
}

export default ProductImagesCarousel